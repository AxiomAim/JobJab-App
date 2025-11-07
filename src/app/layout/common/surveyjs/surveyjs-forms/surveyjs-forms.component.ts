import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { AngularComponentFactory, SurveyComponent } from "survey-angular-ui";
import { Model } from "survey-core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import * as SurveyCore from "survey-core";
import { settings } from "survey-core";
import { FormApproveDialogComponent } from "./form-approve-dialog/form-approve-dialog.component";
import { MatIconModule } from "@angular/material/icon";
import { SurveyModule } from "survey-angular-ui";
import { NgIf } from "@angular/common";
import { CdkScrollable } from "@angular/cdk/scrolling";
import { BorderlessDarkPanelless, DefaultLight } from "survey-core/themes";
import { MatSnackBarService } from "app/core/services/snackbar-service/snackbar.service";
import { DynamicPanelHelper } from "./surveyjs-helper/dynamic-panel-helper";
import { DropdownHelper } from "./surveyjs-helper/dropdown-helper";
import { getBaseColumnName, buildCommentRadioName, applyMatrixCommentRevert, updateCellQuestionComment, getCommentChangeInfo, clearOrphanedMatrixComments } from "./surveyjs-helper/other-option-helper";
import { getRowIndex } from "./surveyjs-helper/matrix-helper";
import { FormsV2Service } from "app/modules/axiomaim/jobjab/forms/forms-v2.service";
import { ConfirmationDialogComponent } from "app/modules/axiomaim/ui/confirmation-dialog/confirmation-dialog.component";


@Component({
  selector: "surveyjs-forms",
  templateUrl: "./surveyjs-forms.component.html",
  styleUrls: ["./surveyjs-forms.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIconModule, SurveyModule, NgIf],
})
export class SurveyjsFormsComponent
  implements OnInit, OnChanges, OnDestroy, AfterViewInit
{
  public _formsV2Service = inject(FormsV2Service);
  private _authDavesaService = inject(AuthDavesaV2Service);
  private _studiesV2Service = inject(StudiesV2Service);
  private _subjectManagerV2Service = inject(SubjectManagerV2Service);

  @ViewChild("survey") surveyComponent: SurveyComponent;
  @Input() surveyData;
  @Input() isCompareVisit: boolean;
  @Input() useLightTheme: boolean = false; // Add theme control input
  @Output() FormCompleteEvent = new EventEmitter<any>();
  surveyModel: Model;
  formAuditTrail: any[] = [];
  public procedureInfo: any;
  public procedureInfoSub: Subscription;
  approveFormPermission: boolean = false;
  disableSubmitButton: boolean = false;
  user_id: number;
  subjectEsourceOid: string;
  PISignature: string = "";
  private isInitialized = false;
  private permissionsLoaded = false;
  private pendingSurveyData: any = null;
  private isSystemClearingHiddenValues = false; // Flag to suppress audit dialogs during system-driven hidden value clearing
  private hiddenQuestionReasons = new Map<string, string>(); // Track reasons for questions that become hidden
  private wheelObservers: MutationObserver[] = [];
  private popupObservers: MutationObserver[] = [];

  constructor(
    public dialog: MatDialog,
    private procedureService: ng13ProcedureService,
    private _snackBarService: MatSnackBarService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
    // If date field missing min validation, it set 0 to min then in turn it calculate min for date field is current date
    // Setting minDate as a workaround to ensure if no min date set, it use the lowest date instead of current date
    settings.minDate = "0001-01-01";
    
    this.surveyModel = new Model();
    
    // Load permissions immediately
    this.loadInitialPermissions();
    
    this.procedureInfoSub = this.procedureService
      .getProcedureInfo()
      .subscribe((info) => {
        this.procedureInfo = info;
        // Re-check procedure permissions when info changes
        this.checkProcedurePermissions();
      });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Add wheel event prevention after view init
    setTimeout(() => {
      this.preventWheelOnInputFields();
    }, 100);
  }

  private loadInitialPermissions() {
    this.checkProcedurePermissions();
    this._authDavesaService.getLogInUserDetails().then((res) => {
      // Run inside NgZone to ensure proper change detection
      this.ngZone.run(() => {
        if (['monitor', 'admin', 'siteManager'].includes(res.user_role?.role.name)) {
          this.disableSubmitButton = true;
        }
        
        // Mark permissions as loaded
        this.permissionsLoaded = true;
        
        // Process any pending survey data
        if (this.pendingSurveyData) {
          this.setSurveyModel(this.pendingSurveyData);
          this.pendingSurveyData = null;
          
          // Force change detection
          this.cdr.detectChanges();
        }
      });
    });
  }

  setSurveyModel(surveyData) {
    //surveyJS model change
    let {
      formModel,
      formData,
      esourceForm,
      subjectOid,
      pdfHeaderData,
      submitStatus,
      studyOid,
      subjectEsourceOid,
      subject_esource_form,
      user,
      customPdfAction,
    } = surveyData;
    this.subjectEsourceOid = subjectEsourceOid;
    // this.getLoginUserRole(studyOid, submitStatus);
    this.PISignature = "";
    //this.surveyModel.clear();
    let currformAuditTrail = [];
    // this.formAuditTrail =
    //   esourceForm.audit_trails?.length > 0 ? esourceForm.audit_trails : [];

    // Fix IDs that start with numbers before processing the form model
    formModel = this.fixIdsStartingWithNumbers(formModel);
    // Remove any explicit id fields from dynamic panel templates to avoid duplicate ids on cloning
    formModel = this.stripDuplicateIdsInDynamicPanelTemplates(formModel);
    formModel = this.changeQuestionType(formModel, false);
    
    // Update logic expressions to match the modified radio button names
    formModel = this.updateLogicExpressionsForMatrixRadioButtons(formModel);

    // Disable built-in confirm dialogs in the form model
    function disableConfirmDialogs(model: any) {
      if (model.pages) {
        model.pages.forEach((page: any) => {
          if (page.elements) {
            page.elements.forEach((element: any) => {
              if (element.type === 'paneldynamic') {
                element.confirmDelete = false;
                if (element.templateElements) {
                  element.templateElements.forEach((templateElement: any) => {
                    if (templateElement.type === 'paneldynamic') {
                      templateElement.confirmDelete = false;
                    }
                  });
                }
              }
            });
          }
        });
      }
    }
    disableConfirmDialogs(formModel);

    const newModel = new Model(formModel);
    // Apply the fix before setting the survey model
    this.applyMatrixRadioButtonFix(newModel);

    // Custom confirm dialog handler
    const customConfirmDelete = (message: string, callback: (confirmed: boolean) => void) => {
      try {
        const dialogData = new ConfirmDialogModel(
          'Confirm Delete',
          message
        );

        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '400px',
          data: dialogData
        });
        
        dialogRef.afterClosed().subscribe(result => {
          callback(result?.confirmed === true);
        });
      } catch (error) {
        console.error('Error opening confirm dialog:', error);
        callback(false);
      }
    };

    // Comprehensive approach: Override ALL SurveyJS confirmation mechanisms
    const applyConfirmDeleteOverride = (question: any) => {
      if (question.getType && question.getType() === 'paneldynamic') {
        
        // 1. Override the removePanelUI method (UI-triggered removal)
        if (question.removePanelUI && !question._originalRemovePanelUI) {
          question._originalRemovePanelUI = question.removePanelUI;
          question.removePanelUI = function(panelToRemove: any) {
            // Always show our custom confirmation
            customConfirmDelete(question.confirmDeleteText || 'Are you sure you want to delete this row?', (confirmed) => {
              if (confirmed) {
                // Check if this is a newly added panel - if so, skip audit dialog
                const panelIndex = typeof panelToRemove === 'number' ? panelToRemove : question.panels.indexOf(panelToRemove);
                if (DynamicPanelHelper.isNewlyAddedPanel(question, panelToRemove, newlyAddedRowIndexes)) {
                  // This is a newly added panel, remove it directly without audit dialog
                  const originalConfirmDelete = question.confirmDelete;
                  const originalSettings = {};
                  
                  // Disable confirmations at all levels
                  question.confirmDelete = false;
                  if (typeof SurveyCore !== 'undefined' && SurveyCore.settings) {
                    originalSettings['confirmDelete'] = (SurveyCore.settings as any).confirmDelete;
                    originalSettings['showConfirmDialog'] = (SurveyCore.settings as any).showConfirmDialog;
                    (SurveyCore.settings as any).confirmDelete = false;
                    (SurveyCore.settings as any).showConfirmDialog = false;
                  }

                  // Call original method
                  try {
                    question._originalRemovePanelUI.call(question, panelToRemove);
                    // Clean up tracking after removal
                    DynamicPanelHelper.removeFromNewlyAddedTracking(question, panelToRemove, newlyAddedRowIndexes);
                  } finally {
                    // Restore settings
                    question.confirmDelete = originalConfirmDelete;
                    if (typeof SurveyCore !== 'undefined' && SurveyCore.settings) {
                      (SurveyCore.settings as any).confirmDelete = originalSettings['confirmDelete'];
                      (SurveyCore.settings as any).showConfirmDialog = originalSettings['showConfirmDialog'];
                    }
                  }
                  return;
                }

                // Show audit trail dialog for panel removal
                if ((surveyData.submitStatus == "pending" || surveyData.submitStatus == "completed")) {
                  const panelData = question.value && question.value[panelIndex] ? question.value[panelIndex] : {};
                  const panelSummary = self.createPanelSummary(panelData);

                  // Show the same audit trail dialog as affected joint removal
                  const dialogOptions = {
                    width: "600px",
                    height: "auto",
                    data: {
                      title: `Reason for Change in Form`,
                      auditTrail: currformAuditTrail,
                      auditReview: {
                        key: `${question.title || question.name} - Panel ${panelIndex + 1}`,
                        oldValue: panelSummary,
                        newValue: "Deleted",
                        updated_at: new Date(),
                      },
                    },
                  };

                  // Open audit trail dialog (same as the existing flow)
                  let dialogRef = self.dialog.open(
                    AuditTrailDialogComponent,
                    dialogOptions
                  );
                  
                  dialogRef.afterClosed().subscribe((res) => {
                    if (res.action === "save") {
                      const { action, fileInfo, ...auditDetails } = res; // remove action & fileInfo on save
                      currformAuditTrail.push(auditDetails);

                      // Proceed with panel removal after audit dialog is saved
                      const originalConfirmDelete = question.confirmDelete;
                      const originalSettings = {};
                      
                      // Disable confirmations at all levels
                      question.confirmDelete = false;
                      if (typeof SurveyCore !== 'undefined' && SurveyCore.settings) {
                        originalSettings['confirmDelete'] = (SurveyCore.settings as any).confirmDelete;
                        originalSettings['showConfirmDialog'] = (SurveyCore.settings as any).showConfirmDialog;
                        (SurveyCore.settings as any).confirmDelete = false;
                        (SurveyCore.settings as any).showConfirmDialog = false;
                      }

                      // Call original method
                      try {
                        question._originalRemovePanelUI.call(question, panelToRemove);
                      } finally {
                        // Restore settings
                        question.confirmDelete = originalConfirmDelete;
                        if (typeof SurveyCore !== 'undefined' && SurveyCore.settings) {
                          (SurveyCore.settings as any).confirmDelete = originalSettings['confirmDelete'];
                          (SurveyCore.settings as any).showConfirmDialog = originalSettings['showConfirmDialog'];
                        }
                      }
                    }

                    if (res.action === "cancel") {
                      // User cancelled the audit dialog, don't remove the panel
                      return;
                    }
                  });
                  
                  // Return early - panel removal will happen in the dialog callback
                  return;
                }

                // If no audit trail needed, proceed with direct removal
                const originalConfirmDelete = question.confirmDelete;
                const originalSettings = {};
                
                // Disable confirmations at all levels
                question.confirmDelete = false;
                if (typeof SurveyCore !== 'undefined' && SurveyCore.settings) {
                  originalSettings['confirmDelete'] = (SurveyCore.settings as any).confirmDelete;
                  originalSettings['showConfirmDialog'] = (SurveyCore.settings as any).showConfirmDialog;
                  (SurveyCore.settings as any).confirmDelete = false;
                  (SurveyCore.settings as any).showConfirmDialog = false;
                }

                // Call original method
                try {
                  question._originalRemovePanelUI.call(question, panelToRemove);
                } finally {
                  // Restore settings
                  question.confirmDelete = originalConfirmDelete;
                  if (typeof SurveyCore !== 'undefined' && SurveyCore.settings) {
                    (SurveyCore.settings as any).confirmDelete = originalSettings['confirmDelete'];
                    (SurveyCore.settings as any).showConfirmDialog = originalSettings['showConfirmDialog'];
                  }
                }
              }
            });
          };
        }

        // 2. Override the removePanel method (programmatic removal)
        if (question.removePanel && !question._originalRemovePanel) {
          question._originalRemovePanel = question.removePanel;
          question.removePanel = function(panelToRemove: any) {
            // Check if this is being called from our UI override
            if (question.confirmDelete === false) {
              // Direct removal, no confirmation needed - audit trail already created in removePanelUI
              question._originalRemovePanel.call(question, panelToRemove);
            } else {
              // Show confirmation for programmatic calls
              customConfirmDelete(question.confirmDeleteText || 'Are you sure you want to delete this row?', (confirmed) => {
                if (confirmed) {
                  // Check if this is a newly added panel - if so, skip audit dialog
                  const panelIndex = typeof panelToRemove === 'number' ? panelToRemove : question.panels.indexOf(panelToRemove);
                  if (DynamicPanelHelper.isNewlyAddedPanel(question, panelToRemove, newlyAddedRowIndexes)) {
                    // This is a newly added panel, remove it directly without audit dialog
                    const originalConfirmDelete = question.confirmDelete;
                    question.confirmDelete = false;
                    try {
                      question._originalRemovePanel.call(question, panelToRemove);
                      // Clean up tracking after removal
                      DynamicPanelHelper.removeFromNewlyAddedTracking(question, panelToRemove, newlyAddedRowIndexes);
                    } finally {
                      question.confirmDelete = originalConfirmDelete;
                    }
                    return;
                  }

                  // Show audit trail dialog for programmatic panel removal (same as affected joint flow)
                  if ((surveyData.submitStatus == "pending" || surveyData.submitStatus == "completed")) {
                    const panelData = question.value && question.value[panelIndex] ? question.value[panelIndex] : {};
                    const panelSummary = self.createPanelSummary(panelData);

                    // Show the same audit trail dialog as affected joint removal
                    const dialogOptions = {
                      width: "600px",
                      height: "auto",
                      data: {
                        title: `Reason for Change in Form`,
                        auditTrail: currformAuditTrail,
                        auditReview: {
                          key: `${question.title || question.name} - Panel ${panelIndex + 1}`,
                          oldValue: panelSummary,
                          newValue: "Deleted",
                          updated_at: new Date(),
                        },
                      },
                    };

                    // Open audit trail dialog (same as the existing flow)
                    let dialogRef = self.dialog.open(
                      AuditTrailDialogComponent,
                      dialogOptions
                    );
                    
                    dialogRef.afterClosed().subscribe((res) => {
                      if (res.action === "save") {
                        const { action, fileInfo, ...auditDetails } = res; // remove action & fileInfo on save
                        currformAuditTrail.push(auditDetails);
                        // Proceed with panel removal after audit dialog is saved
                        const originalConfirmDelete = question.confirmDelete;
                        question.confirmDelete = false;
                        try {
                          question._originalRemovePanel.call(question, panelToRemove);
                        } finally {
                          question.confirmDelete = originalConfirmDelete;
                        }
                      }

                      if (res.action === "cancel") {
                        // User cancelled the audit dialog, don't remove the panel
                        return;
                      }
                    });
                    
                    // Return early - panel removal will happen in the dialog callback
                    return;
                  }

                  // If no audit trail needed, proceed with direct removal
                  const originalConfirmDelete = question.confirmDelete;
                  question.confirmDelete = false;
                  try {
                    question._originalRemovePanel.call(question, panelToRemove);
                  } finally {
                    question.confirmDelete = originalConfirmDelete;
                  }
                }
              });
            }
          };
        }

        // 3. Override any existing confirmDelete property
        (question as any).confirmDelete = true; // Keep enabled but we'll handle it
        (question as any)._customConfirmHandler = customConfirmDelete;
      }
    };

    // Apply overrides at multiple lifecycle points
    newModel.onAfterRenderQuestion.add((survey, options) => {
      applyConfirmDeleteOverride(options.question);
      // Ensure newly rendered inputs also get wheel prevention
      setTimeout(() => {
        this.preventWheelOnInputFields();
      }, 0);
      // Prevent header clicks from causing focus/scroll
      if (options && options.htmlElement) {
        this.wireSurveyTitleAndHeaderClicks(options.htmlElement as HTMLElement);
      }
    });

    newModel.onAfterRenderSurvey.add((survey, options) => {
      setTimeout(() => {
        survey.getAllQuestions().forEach(applyConfirmDeleteOverride);
        // Prevent wheel events on input fields after survey renders
        this.preventWheelOnInputFields();
        // Wire headers at survey root to stop scroll on header clicks
        if (options && options.htmlElement) {
          this.wireSurveyTitleAndHeaderClicks(options.htmlElement as HTMLElement);
        }
      }, 100);
    });

    newModel.onDynamicPanelAdded.add((survey, options) => {
      // Strip any duplicated `id` fields on newly added panel elements
      if (options && options.panel) {
        this.stripIdsFromPanelElements(options.panel);
      }

      setTimeout(() => {
        // Apply to the specific question and all questions in case of nested panels
        if (options.question) {
          applyConfirmDeleteOverride(options.question);
        }
        survey.getAllQuestions().forEach(applyConfirmDeleteOverride);
        // Prevent wheel events on input fields after dynamic panel is added
        this.preventWheelOnInputFields();
        
        // Force re-render of the newly added panel to ensure custom widgets are properly initialized
        const panel = options.panel;
        if (panel && panel.elements) {
          panel.elements.forEach((element: any) => {
            if (element.getType() === "text" && 
                (element.inputType === "date" || element.inputType === "datetime-local")) {
              // Trigger a re-render of this question to ensure custom widget is applied
              element.render?.();
            }
          });
        }
        
        // Reuse helper to mark new row
        DynamicPanelHelper.markNewDynamicPanelRow(options.question, options.panel, newlyAddedRowIndexes, initialValues);
      }, 50);
    });

    // newModel.applyTheme(themeJSON as any);
    this.surveyModel = newModel;
    this.surveyModel.clearInvisibleValues = 'none'; // Disable default behavior, we'll handle it manually



    // Handle clearing hidden values before complete with audit logging
    const self = this;
    this.surveyModel.onCompleting.add(function (survey, options) {
      // Clear hidden values and create audit logs before complete
      self.clearHiddenValuesWithAuditLogging(survey, currformAuditTrail);
    });
    
    // Apply theme based on useLightTheme input parameter
    // Default to dark theme for eSource forms (better visual), unless explicitly set to light
    newModel.applyTheme(this.useLightTheme ? DefaultLight : BorderlessDarkPanelless);

    // Clear any existing conflicting widgets and register our custom widgets
    // Register our custom widgets that use the same design
    SurveyCore.CustomWidgetCollection.Instance.add(jqueryDateTimePickerWidget);
    SurveyCore.CustomWidgetCollection.Instance.add(jqueryDatePickerWidget);

    // Ensure custom widgets are properly initialized for all questions
    this.surveyModel.onAfterRenderQuestion.add(function (survey, options) {
      const question = options.question;
      if (question.getType() === SurveyJSConstants.QUESTION_TYPES.TEXT && 
          (question.inputType === SurveyJSConstants.INPUT_TYPES.DATE || question.inputType === SurveyJSConstants.INPUT_TYPES.DATETIME_LOCAL)) {
        // Force a small delay to ensure the DOM is ready
        setTimeout(() => {
          question.render?.();
        }, 50);
      }
    });



    // Also handle when panels are rendered to ensure widgets are applied
    // Use a consistent self reference
    const selfRef = this;
    this.surveyModel.onAfterRenderPanel.add(function (survey, options) {
      const panel = options.panel;
      if (panel && panel.elements) {
        panel.elements.forEach((element: any) => {
          if (element.getType() === SurveyJSConstants.QUESTION_TYPES.TEXT && 
              (element.inputType === SurveyJSConstants.INPUT_TYPES.DATE || element.inputType === SurveyJSConstants.INPUT_TYPES.DATETIME_LOCAL)) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
              element.render?.();
            }, 50);
          }
        });
        // Unified: apply ID fixes for controls in this panel (handles both static and dynamic panels)
        selfRef.fixPanelControlIds(panel, options.htmlElement as HTMLElement);
      }

      // Ensure popup aria when dropdowns open within this panel
      if (options.htmlElement) {
        selfRef.ensureDropdownPopupAria(options.htmlElement as HTMLElement);
        // Wire SurveyJS header/title clicks to focus inputs without scrolling
        selfRef.wireSurveyTitleAndHeaderClicks(options.htmlElement as HTMLElement);
      }
    });

    // Handle survey re-renders to ensure widgets are applied
    this.surveyModel.onAfterRenderSurvey.add(function (survey, options) {
      // Force re-render of all date/time questions to ensure widgets are applied
      survey.getAllQuestions().forEach((question: any) => {
        if (question.getType() === SurveyJSConstants.QUESTION_TYPES.TEXT && 
            (question.inputType === SurveyJSConstants.INPUT_TYPES.DATE || question.inputType === SurveyJSConstants.INPUT_TYPES.DATETIME_LOCAL)) {
          setTimeout(() => {
            question.render?.();
          }, 100);
        }
      });
    });

    // Add event handlers to ensure matrix radio button fix is applied at render time
    const selfComponent = this;
    this.surveyModel.onAfterRenderQuestion.add(function (survey, options) {
      if (options.question.getType() === SurveyJSConstants.MATRIX_TYPES.MATRIX_DROPDOWN) {
        selfComponent.fixMatrixQuestionRadioButtons(options.question);
        // Ensure unique IDs for dropdowns inside matrix rows to avoid focus jumping
        selfComponent.fixMatrixDropdownIds(options.question, options.htmlElement);
      }
      
      // Apply theme attributes to dropdown popups when any question renders
      // This ensures dropdowns get themed regardless of question type
      const dropdownPopups = document.querySelectorAll('.sv-popup.sv-dropdown-popup');
      dropdownPopups.forEach((popup) => {
        if (selfComponent.useLightTheme) {
          popup.removeAttribute('data-theme');
        } else {
          popup.setAttribute('data-theme', 'dark');
        }
      });
    });

    // Also fix on survey render
    this.surveyModel.onAfterRenderSurvey.add(function (survey, options) {
      survey.getAllQuestions().forEach((question) => {
        if (question.getType() === SurveyJSConstants.MATRIX_TYPES.MATRIX_DROPDOWN) {
          selfComponent.fixMatrixQuestionRadioButtons(question);
          selfComponent.fixMatrixDropdownIds(question);
        }
      });
    });


    // Store the previous values for proper oldValue tracking - DECLARE AT TOP
    const previousValues = new Map();
    // Store matrix-specific old values to prevent interference from other questions
    const matrixOldValues = new Map();
    // Store per-question old values to prevent interference between questions
    const perQuestionOldValues = new Map();
    // Store original values before any expression changes for proper revert
    const originalQuestionValues = new Map();
    // Store dynamic panel old values to compute precise oldValue per control
    const dynamicPanelOldValues = new Map();
    // Queue pending comment reverts for radiogroup Other flows keyed by base question name
    const pendingCommentReverts = new Map<string, any>();
    // Track newly added dynamic panel rows per question name to suppress audit in new rows
    const newlyAddedRowIndexes = new Map<string, Set<number>>();

    // Track questions that are being reverted to prevent cascading logic
    const questionsBeingReverted = new Set();

    // Set initial form data
    if (formData) {
      this.surveyModel.data = formData;
      
      // Initialize previousValues map with current form data for matrix questions
      this.surveyModel.getAllQuestions().forEach((question) => {
        if (question.getType() === 'matrixdropdown') {
          const currentValue = question.value;
          if (currentValue && typeof currentValue === 'object') {
            previousValues.set(question.name, JSON.parse(JSON.stringify(currentValue)));
            matrixOldValues.set(question.name, JSON.parse(JSON.stringify(currentValue)));
          }
        } else if (question.getType() === SurveyJSConstants.QUESTION_TYPES.PANEL_DYNAMIC) {
          // Seed per-question old values for dynamic panels to ensure correct oldValue detection
          const currentValue = question.value;
          perQuestionOldValues.set(question.name, JSON.parse(JSON.stringify(currentValue)));
          dynamicPanelOldValues.set(question.name, JSON.parse(JSON.stringify(currentValue)));
        }
      });
    }

    // Store initial values for all questions for proper oldValue tracking
    const initialValues = new Map();
    if (formData) {
      Object.keys(formData).forEach((qName) => {
        const initialValue = JSON.parse(JSON.stringify(formData[qName]));
        initialValues.set(qName, initialValue);
        // Also set as original value for tracking
        originalQuestionValues.set(qName, initialValue);
      });
    }
    
    //this option allow us to disable thankyou page
    this.surveyModel.showCompletedPage = false;
    // formData = this.changeDateFormat(formModel, formData);
    let oldValue = null;
    let isDialogCancel = false;
    let isFileValueChange = false;
    // Note: previousValues is declared above near the top of the function

    // hide complete button
    if (this.disableSubmitButton || this.isCompareVisit) {
      this.surveyModel.showCompleteButton = false;
    }
    let panelTitle;

    this.surveyModel.onValueChanging.add(function (survey, options) {
      // Skip expression-driven changes if any question is being reverted to prevent cascades except for revert to original empty value
      if (options.reason === 'expression' && questionsBeingReverted.size > 0 && options.value != undefined) {
        // Cancel this change by setting the value back to oldValue
        options.value = options.oldValue;
        return;
      }
      
      // If a control inside a dynamic panel is changing, capture the parent's old snapshot
      try {
        const q: any = (options as any)?.question;
        const innerDynamicPanel = q?.parent?.parentQuestion;
        if (innerDynamicPanel && typeof innerDynamicPanel.getType === 'function' && innerDynamicPanel.getType() === SurveyJSConstants.QUESTION_TYPES.PANEL_DYNAMIC) {
          const innerSnapshot = JSON.parse(JSON.stringify(innerDynamicPanel.value));
          perQuestionOldValues.set(innerDynamicPanel.name, innerSnapshot);
        }
        // Try to also capture the outer dynamic panel if present (grandparent)
        const outerPanelInstance = innerDynamicPanel?.parent; // Panel instance of outer DP
        const outerDynamicPanel = outerPanelInstance?.parentQuestion;
        if (outerDynamicPanel && typeof outerDynamicPanel.getType === 'function' && outerDynamicPanel.getType() === SurveyJSConstants.QUESTION_TYPES.PANEL_DYNAMIC) {
          const outerSnapshot = JSON.parse(JSON.stringify(outerDynamicPanel.value));
          perQuestionOldValues.set(outerDynamicPanel.name, outerSnapshot);
        }
      } catch (e) {
        console.log('[DP-OldSnapshot] capture failed:', e);
      }
      
      if (options.question.getType() === SurveyJSConstants.QUESTION_TYPES.PANEL_DYNAMIC) {
        panelTitle = options.question.title;
        oldValue = options.oldValue;
        // Store per-question old value
        perQuestionOldValues.set(options.question.name, options.oldValue);
      } else if (options.question.getType() === SurveyJSConstants.MATRIX_TYPES.MATRIX_DROPDOWN) {
        // For matrix questions, capture the complete previous state
        const currentMatrixValue = JSON.parse(
          JSON.stringify(options.value || {})
        );
        
        // Get the actual previous matrix value
        let previousMatrixValue = previousValues.get(options.question.name);
        
        // If we don't have a previous value in our map, use the initial value
        if (!previousMatrixValue) {
          previousMatrixValue = initialValues.get(options.question.name) || {};
        }
        
        // Only use options.oldValue as fallback if it's an object
        if (!previousMatrixValue || Object.keys(previousMatrixValue).length === 0) {
          if (options.oldValue && typeof options.oldValue === 'object' && !Array.isArray(options.oldValue)) {
            previousMatrixValue = options.oldValue;
          } else {
            previousMatrixValue = {};
          }
        }
        
        // Store the complete previous matrix state for audit (ensure it's an object)
        const matrixOldValue = previousMatrixValue && typeof previousMatrixValue === 'object' ? previousMatrixValue : {};
        
        // Clean the matrix old value to remove SurveyJS internal radio button modifications
        const cleanMatrixOldValue = self.cleanMatrixDataForStorage(matrixOldValue, options.question.name);
        
        // Store matrix old value separately to prevent interference from other questions
        matrixOldValues.set(options.question.name, cleanMatrixOldValue);
        
        // Also update the global oldValue for non-matrix questions that might follow
        oldValue = options.oldValue;
        
        // Store per-question old value
        perQuestionOldValues.set(options.question.name, options.oldValue);
        
        // Update our tracking map with the current value (clean, not the question's internal value)
        const cleanCurrentMatrixValue = self.cleanMatrixDataForStorage(currentMatrixValue, options.question.name);
        previousValues.set(options.question.name, cleanCurrentMatrixValue);
      } else {
        panelTitle = null;
        // For non-matrix, non-panel questions, capture the simple old value
        // Store per-question old value to prevent interference between questions
        if (
          JSON.stringify(options.value) !== JSON.stringify(options.oldValue) &&
          !isDialogCancel
        ) {
          if (
            options.question["jsonObj"]["type"] === "file" &&
            options.oldValue === undefined &&
            options.value?.length > 0
          ) {
            // File upload case - don't overwrite oldValue
          } else {
            oldValue = options.oldValue;
            // Store per-question old value
            perQuestionOldValues.set(options.question.name, options.oldValue);
            
            // If we don't have an original value stored yet, store the current old value as original
            if (!originalQuestionValues.has(options.question.name)) {
              originalQuestionValues.set(options.question.name, options.oldValue);
            }
          }
        }
      }
    });
    // on esource question value change we are opening audit trail dialog
    this.surveyModel.onValueChanged.add(function (survey, options) {
      // Add unfocus functionality for dropdown questions when their values change
      if (options.question.getType() === SurveyJSConstants.QUESTION_TYPES.DROPDOWN) {
        // unfocus on the dropdown element after a short delay to ensure UI is updated
        setTimeout(() => {
          DropdownHelper.unfocusOnDropdownElement(options.question);
        }, 100);
      }
      
      if (self.isSystemClearingHiddenValues) {
        return;
      }
      // Skip audit during dialog cancel operations
      if (isDialogCancel) {
        return;
      }
      // Skip audit for expression-driven changes during revert operations
      if (options.reason === 'expression' && questionsBeingReverted.size > 0) {
        return;
      }
      // Extract original question name if it was modified by our radio button fix
      let originalQuestionName = options.name;
      if (
        originalQuestionName.includes("_row") &&
        originalQuestionName.includes("_")
      ) {
        // This might be a modified radio button name, try to extract the original
        const parts = originalQuestionName.split("_row");
        if (parts.length > 1) {
          originalQuestionName = parts[0];
        }
      }
      if (
        JSON.stringify(oldValue) !== JSON.stringify(options.value) && surveyData?.formData?.[originalQuestionName] &&
        (surveyData.submitStatus == "pending" || surveyData.submitStatus == "completed") && !isDialogCancel
      ) {
        let newValue;
        if (
          options.question["jsonObj"]["type"] === "file" &&
          options.value?.length > 0
        ) {
          newValue = options.value.map((file) => file.name).join(",");
        } else {
          newValue = options.value;
        }
        if (options.question["jsonObj"]["inputType"] === "date") {
          if (newValue) {
            newValue = moment(newValue).format("DD MMM YYYY");
          }
          if (oldValue) {
            oldValue = moment(oldValue).format("DD MMM YYYY");
          }
        }
        let isDialogOpen = true;

        if (
          options.question["jsonObj"]["type"] === "file" &&
          oldValue?.length > 0 &&
          newValue?.length === 0
        ) {
          isDialogOpen = false;
        } else {
          isDialogOpen = true;
        }

        if (options.question.getType() !== SurveyJSConstants.QUESTION_TYPES.PANEL_DYNAMIC) {
          // Check if this is a matrix question change
          const isMatrixQuestion =
            options.question.getType() === SurveyJSConstants.MATRIX_TYPES.MATRIX_DROPDOWN;

          if (isMatrixQuestion) {
            // Get the previous matrix state from our dedicated matrix tracking
            const prevMatrix = matrixOldValues.get(options.question.name) || {};
            const currMatrix = JSON.parse(
              JSON.stringify(options.question.value || {})
            );
            // Validate that we have proper matrix objects before comparison
            if (!prevMatrix || typeof prevMatrix !== 'object' || Array.isArray(prevMatrix)) {
              // Try to recover by using the question's current value cleaned
              const fallbackPrevMatrix = self.cleanMatrixDataForStorage(options.question.value || {}, options.question.name);
              
              if (fallbackPrevMatrix && typeof fallbackPrevMatrix === 'object' && Object.keys(fallbackPrevMatrix).length > 0) {
                // Update the stored value for future use
                matrixOldValues.set(options.question.name, fallbackPrevMatrix);
                const prevMatrix = fallbackPrevMatrix;
              } else {
                return;
              }
            }
            if (!currMatrix || typeof currMatrix !== 'object' || Array.isArray(currMatrix)) {
              return;
            }
            
            // Additional validation: Ensure matrices have proper structure (rows as objects)
            const prevMatrixKeys = Object.keys(prevMatrix);
            const currMatrixKeys = Object.keys(currMatrix);
            
            // Filter out any non-row keys (should be actual row text)
            const validPrevKeys = prevMatrixKeys.filter(key => {
              const value = prevMatrix[key];
              return value && typeof value === 'object' && !Array.isArray(value);
            });
            
            const validCurrKeys = currMatrixKeys.filter(key => {
              const value = currMatrix[key];
              return value && typeof value === 'object' && !Array.isArray(value);
            });
            
            if (validPrevKeys.length === 0 && validCurrKeys.length === 0) {
              return;
            }
            
            // Update the current matrix values to match modified radio button values
            self.updateCurrentMatrixValues(currMatrix, options.question.name);
            
            // Clear orphaned comment fields when values change from "other" to regular options
            clearOrphanedMatrixComments(prevMatrix, currMatrix, options.question.name, self.surveyModel);
            
            const change = self.detectMatrixCellChange(
              prevMatrix,
              currMatrix,
              options.question
            );

            // If nothing actually changed, do nothing
            if (!change) {
              return;
            }

            // Skip audit for matrix comment-only changes (typing into "other" comments)
            if (change.columnName && typeof change.columnName === 'string' && change.columnName.endsWith('-Comment')) {
              // Only skip if going from empty -> non-empty or empty -> empty
              const rowKey = change.rowKey;
              const prevRow = prevMatrix && prevMatrix[rowKey] ? prevMatrix[rowKey] : {};
              const currRow = currMatrix && currMatrix[rowKey] ? currMatrix[rowKey] : {};
              const prevRaw = prevRow[change.columnName];
              const currRaw = currRow[change.columnName];
              const prevStr = (prevRaw === undefined || prevRaw === null) ? '' : String(prevRaw).trim();
              const currStr = (currRaw === undefined || currRaw === null) ? '' : String(currRaw).trim();
              if (!(prevStr.length > 0 && currStr.length > 0 && prevStr !== currStr)) {
                const cleanedMatrixForStorage = self.cleanMatrixDataForStorage(currMatrix, options.question.name);
                matrixOldValues.set(options.question.name, JSON.parse(JSON.stringify(cleanedMatrixForStorage)));
                originalQuestionValues.set(options.question.name, JSON.parse(JSON.stringify(cleanedMatrixForStorage)));
                perQuestionOldValues.set(options.question.name, JSON.parse(JSON.stringify(cleanedMatrixForStorage)));
                return;
              }
            }

            // Focus on the matrix dropdown cell that changed
            setTimeout(() => {
              DropdownHelper.focusOnMatrixDropdownCell(options.question, change);
            }, 100);

            // Build a human-friendly key: "<Question Title> - <Row Title>"
            const questionTitle = options.question.title || options.question.name;
            const baseKey = `${questionTitle} - ${change.rowTitle}`;
            // If there are multiple columns, optionally append column title
            const includeColumn =
              Array.isArray(options.question.columns) &&
              options.question.columns.length > 1;
            const displayKey = includeColumn
              ? `${baseKey} - ${change.columnTitle}`
              : baseKey;

            const dialogOptions = {
              width: "600px",
              height: "auto",
              data: {
                title: `Reason for Change in Form`,
                auditTrail: currformAuditTrail,
                auditReview: {
                  key: displayKey,
                  oldValue: change.oldValue,
                  newValue: change.newValue,
                  updated_at: new Date(),
                },
              },
            };

            if (isDialogOpen && !isFileValueChange && dialogOptions.data.auditReview.oldValue !== dialogOptions.data.auditReview.newValue) {
              let dialogRef = self.dialog.open(
                AuditTrailDialogComponent,
                dialogOptions
              );
              dialogRef.afterClosed().subscribe((res) => {
                if (res.action === "save") {
                  const { action, fileInfo, ...auditDetails } = res;
                  

                  currformAuditTrail.push(auditDetails);
                  
                  const cleanedMatrixForStorage = self.cleanMatrixDataForStorage(currMatrix, options.question.name);
                  matrixOldValues.set(options.question.name, JSON.parse(JSON.stringify(cleanedMatrixForStorage)));
                  originalQuestionValues.set(options.question.name, JSON.parse(JSON.stringify(cleanedMatrixForStorage)));
                  perQuestionOldValues.set(options.question.name, JSON.parse(JSON.stringify(cleanedMatrixForStorage)));
                  
                  // Track questions that become hidden due to this change and associate the reason
                  self.trackHiddenQuestionsWithReason(survey, auditDetails.reason);
                  isDialogCancel = false;
                }

                if (res.action === "cancel") {
                  // Set flag BEFORE making any changes to prevent cascading events
                  isDialogCancel = true;
                  
                  // Mark this question as being reverted to prevent logic cascades
                  questionsBeingReverted.add(options.question.name);
                  if (prevMatrix && typeof prevMatrix === 'object' && !Array.isArray(prevMatrix) && Object.keys(prevMatrix).length > 0) {
                    // Try revert first - only affect the changed cell
                    const surgicalResult = self.revertMatrixCellSurgically(
                      options.question,
                      change,
                      prevMatrix,
                      options.question.value
                    );
                    
                    if (surgicalResult) {
                      // Update the matrix old values map with the reverted value
                      matrixOldValues.set(options.question.name, JSON.parse(JSON.stringify(prevMatrix)));
                    } else {
                      // Fallback to full reconstruction if the approach fails
                      // TODO: This is a temporary fix to ensure the matrix is reverted correctly.
                      const reconstructed = self.reconstructMatrixValueWithRadioNames(
                        prevMatrix,
                        options.question
                      );
                      
                      matrixOldValues.set(options.question.name, JSON.parse(JSON.stringify(prevMatrix)));
                      
                      setTimeout(() => {
                        self.surveyModel.setValue(options.question.name, reconstructed);
                        
                        setTimeout(() => {
                          // Clear revert tracking and reset flags
                          questionsBeingReverted.delete(options.question.name);
                          isDialogCancel = false;
                        }, 300);
                      }, 50);
                    }
                    isDialogCancel = false;
                  } else {
                    // Don't attempt to revert with invalid data
                    isDialogCancel = false;
                    
                    // Instead, try to get the original question value from the survey
                    const currentQuestionValue = options.question.value;
                    
                    if (currentQuestionValue && typeof currentQuestionValue === 'object') {
                      matrixOldValues.set(options.question.name, JSON.parse(JSON.stringify(currentQuestionValue)));
                    }
                  }
                }
              });
            } else {
              // Initial entry case
              const auditDetails = {
                key: displayKey,
                reason: "Initial Entry",
                oldValue: change.oldValue,
                newValue: change.newValue,
                updated_at: new Date(),
              };
              currformAuditTrail.push(auditDetails);
            }
          } else {
            // Handle regular question changes
            // Get the per-question old value. For expression-driven changes, use the original value
            const { isCommentChange, targetKey } = getCommentChangeInfo(options);
            let questionOldValue = perQuestionOldValues.get(targetKey) ?? oldValue;
            
            // Skip audit dialog for regular comment field changes
            if (isCommentChange) {
              const baseKey = typeof options.name === 'string' ? options.name.replace(/-Comment$/, '') : (options.question?.name || '');
              pendingCommentReverts.set(baseKey, questionOldValue);
              const prevStr = (questionOldValue === undefined || questionOldValue === null) ? '' : String(questionOldValue).trim();
              const currStr = (options.value === undefined || options.value === null) ? '' : String(options.value).trim();
              // Skip only if not both non-empty and different
              if (!(prevStr.length > 0 && currStr.length > 0 && prevStr !== currStr)) {
                return;
              }
            }
            
            // If this change is triggered by an expression (setValueIf, etc.), use the original value
            if (options.reason === 'expression' && originalQuestionValues.has(targetKey)) {
              questionOldValue = originalQuestionValues.get(targetKey);
            }
            
            const dialogOptions = {
              width: "600px",
              height: "auto",
              data: {
                title: `Reason for Change in Form`,
                auditTrail: currformAuditTrail,
                auditReview: {
                  key: options.question["jsonObj"]["title"]
                    ? options.question["jsonObj"]["title"]
                    : originalQuestionName,
                  oldValue:
                    options.question["jsonObj"]["type"] === "file" &&
                    questionOldValue?.length > 0
                      ? questionOldValue.map((file) => file.name).join(",")
                      : questionOldValue,
                  newValue: newValue,
                  updated_at: new Date(),
                },
              },
            };
            //audit trail
            if (isDialogOpen && !isFileValueChange && dialogOptions.data.auditReview.oldValue !== dialogOptions.data.auditReview.newValue) {
              let dialogRef = self.dialog.open(
                AuditTrailDialogComponent,
                dialogOptions
              );
              dialogRef.afterClosed().subscribe((res) => {
                if (res.action === "save") {
                  const { action, fileInfo, ...auditDetails } = res; // remove action & fileInfo on save
                  currformAuditTrail.push(auditDetails);
                  
                  // Update the original question value since the user confirmed this change
                  originalQuestionValues.set(options.question.name, options.value);
                  perQuestionOldValues.set(options.question.name, options.value);
                  // Track questions that become hidden due to this change and associate the reason
                  self.trackHiddenQuestionsWithReason(survey, auditDetails.reason);
                  
                  // Reset the flag after save
                  isDialogCancel = false;
                }

                if (res.action === "cancel") {
                  isDialogCancel = true;
                  
                  // Mark this question as being reverted to prevent logic cascades
                  questionsBeingReverted.add(options.question.name);
                  
                  // Use the per-question old value. For expression-driven changes, use the original value
                  let questionOldValue = perQuestionOldValues.get(options.question.name) ?? oldValue;
                  
                  // If this change was triggered by an expression, revert to the original value
                  if (options.reason === 'expression' && originalQuestionValues.has(options.question.name)) {
                    questionOldValue = originalQuestionValues.get(options.question.name);
                  }

                  if (pendingCommentReverts.has(options.question.name)) {
                    if (isCommentChange) {
                      const temp = options.question.value;
                      survey.setValue(`${options.question.name}`, questionOldValue, undefined, false, `${options.question.name}-Comment`);
                      survey.setValue(`${options.question.name}`, temp);
                    }
                    const priorComment = pendingCommentReverts.get(options.question.name);
                    pendingCommentReverts.delete(options.question.name);
                    survey.setValue(`${options.question.name}`, priorComment, undefined, false, `${options.question.name}-Comment`);
                    survey.setValue(`${options.question.name}`, questionOldValue);
                  }
                  else {
                    options.question.value = questionOldValue;
                  }
                  // Reset the flag after the revert has been processed
                  setTimeout(() => {
                    questionsBeingReverted.delete(options.question.name);
                  }, 300); // Use same delay as matrix questions
                  isDialogCancel = false;
                }
              });
            } else {
              const auditDetails = {
                key: options.question.title,
                reason: "Initial Entry",
                oldValue: undefined,
                newValue: options.value,
                updated_at: new Date(),
              };
              currformAuditTrail.push(auditDetails);
            }
          }
        }
      }
    });

    // Track dynamic panel hierarchy changes to build complete audit paths
    const dynamicPanelHierarchy = new Map<string, any>();
    
    //on dynamic panel control change we open audit trail
    this.surveyModel.onDynamicPanelValueChanged.add((sender, options) => {
      // Generate a unique key for this change event to track hierarchy
      const changeKey = `${options.question.name}_${Date.now()}_${Math.random()}`;
      
      // If this is a panel-level event (value is an array snapshot), collect hierarchy info and skip
      if (Array.isArray(options.value)) {
        // This is an outer panel change - collect hierarchy information
        const hierarchyInfo = {
          questionName: options.question.name,
          panelIndex: options.panelIndex,
          panelTitle: options.question.title || options.question.name,
          isOuterPanel: true,
          timestamp: Date.now()
        };
        
        dynamicPanelHierarchy.set(changeKey, hierarchyInfo);
        return;
      }
      
      // This is a leaf control change - build complete hierarchy path
      const completeHierarchy = DynamicPanelHelper.buildCompleteDynamicPanelHierarchy(options, dynamicPanelHierarchy);
      
      // Detect the correct outer panel index when dealing with nested dynamic panels
      let outerPanelIndex = DynamicPanelHelper.detectOuterPanelIndex(options);
      let nestedPanelIndex = options.panelIndex; // This is the nested panel index

      // Leaf control event: name is the control, options.value is scalar, oldValue is scalar
      const controlName = options.name;
      let newValue: any = options.value;

      const elementChanged = (options.question.templateElements.find((element: any) => {
        const el = element && element["jsonObj"] ? element["jsonObj"] : element;
        return el && el["name"] === controlName;
      }) || { jsonObj: {} });
      const elementChangedObj: any = elementChanged["jsonObj"] ? elementChanged["jsonObj"] : elementChanged;

      const elementTitle = elementChangedObj?.["title"] || controlName;
      const panelTitleResolved = panelTitle || options.question.title || options.question.name;
      
      // Create a hierarchical panel key for nested panels
      let panelKey = '';
      if (options.panel && options.panel.parentQuestion && 
          options.panel.parentQuestion.getType && 
          options.panel.parentQuestion.getType() === SurveyJSConstants.QUESTION_TYPES.PANEL_DYNAMIC) {
        const hierarchyPath = DynamicPanelHelper.buildHierarchyPathFromCompleteHierarchy(completeHierarchy);
        
        panelKey = `${hierarchyPath} - ${elementTitle}`;
      } else {
        panelKey = `${panelTitleResolved} - Panel ${outerPanelIndex + 1} - ${elementTitle}`;
      }

      if (elementChangedObj?.type === SurveyJSConstants.QUESTION_TYPES.PANEL_DYNAMIC) {
        // Keep old values in sync for the parent dynamic panel
        perQuestionOldValues.set(options.question.name, JSON.parse(JSON.stringify(options.question.value)));
        return;
      }

      // Precise old value comes from the event for leaf control
      let questionOldValue: any = (options && 'oldValue' in options) ? options.oldValue : null;
      if (questionOldValue === null || questionOldValue === undefined) {
        // Fallback to our stored snapshot if needed
        const panelOldValue = perQuestionOldValues.get(options.question.name) ?? null;
        if (panelOldValue && Array.isArray(panelOldValue)) {
          questionOldValue = panelOldValue?.[nestedPanelIndex]?.[controlName];
        }
      }

      // Skip audit for initial entry changes
      if (questionOldValue === null || questionOldValue === undefined) {
        perQuestionOldValues.set(options.question.name, JSON.parse(JSON.stringify(options.question.value)));
        return;
      }

      let isDialogOpen;

      if (
        questionOldValue !== newValue &&
        (surveyData.submitStatus == "pending" ||
          surveyData.submitStatus == "completed")
      ) {
        if (elementChangedObj.type == "file") {
          newValue = options.value.map((file) => file.name).join(",");
        }
        if (elementChangedObj.type === "date") {
          if (newValue) {
            newValue = moment(newValue).format("DD MMM YYYY");
          }
        } else {
        }

        if (
          elementChangedObj.type === "file" &&
          questionOldValue?.length > 0 &&
          newValue?.length === 0
        ) {
          isDialogOpen = false;
        } else {
          isDialogOpen = true;
        }

        const dialogOptions = {
          width: "600px",
          height: "auto",
          data: {
            title: `Reason for Change in Form`,
            auditTrail: currformAuditTrail,
            auditReview: {
              key: panelKey,
              oldValue:
                elementChangedObj["type"] === "file" &&
                questionOldValue?.length > 0
                  ? questionOldValue.map((file) => file.name).join(",")
                  : questionOldValue,
              newValue: newValue,
              updated_at: new Date(),
            },
          },
        };

        // Skip all audits for newly added rows entirely
        const newRows = newlyAddedRowIndexes.get(options.question.name);
        if (newRows && newRows.has(nestedPanelIndex)) {
          perQuestionOldValues.set(options.question.name, JSON.parse(JSON.stringify((options.question as any).value)));
          return;
        }

        //audit trail
        if (isDialogOpen && !isFileValueChange && dialogOptions.data.auditReview.oldValue !== dialogOptions.data.auditReview.newValue) {
          let dialogRef = self.dialog.open(
            AuditTrailDialogComponent,
            dialogOptions
          );
          dialogRef.afterClosed().subscribe((res) => {
            if (res.action === "save") {
              const { action, fileInfo, ...auditDetails } = res; // remove action & fileInfo on save
              currformAuditTrail.push(auditDetails);
              perQuestionOldValues.set(options.question.name, options.question.value);
              isDialogCancel = false;
            }

             if (res.action === "cancel") {
              isDialogCancel = true;
              
              // Mark this question as being reverted to prevent logic cascades
              questionsBeingReverted.add(options.question.name);
              
               // Revert only the specific control in the specific row to its old value
              const dp = options.question as any;
              const current = Array.isArray(dp.value) ? JSON.parse(JSON.stringify(dp.value)) : [];
              if (!current[nestedPanelIndex]) current[nestedPanelIndex] = {};
              current[nestedPanelIndex][controlName] = questionOldValue;
              dp.value = current;
              
              // Clear revert tracking after a delay
              setTimeout(() => {
                questionsBeingReverted.delete(options.question.name);
              }, 300);
              isDialogCancel = false;
            }
          });
        }
      }
    });

    // upload file before complete survey
    // Use a Set to avoid duplicate delete requests for the same URL
    const tempRemoveFile = new Set<string>();
    // surveyjs event form complete
    this.surveyModel.onComplete.add(function (sender, options) {
      //Remove files from gcp
      if (tempRemoveFile && tempRemoveFile.size > 0) {
        Array.from(tempRemoveFile).forEach((item) => {
          return new Promise((resolve) => {
            const extractedString = item?.split(",")[1];
            if (!self.isBase64(extractedString)) {
              self._subjectManagerV2Service
                .deleteEsourceDocument({
                  fileUrl: item,
                  subject_oid: subjectOid,
                })

                .subscribe((res) => {
                  // Remove from set after successful deletion
                  tempRemoveFile.delete(item);

                  res && resolve(true);
                });
            }
          });
        });
      }
      // `tempFileStorage` keys are question names
      const questionsToUpload = Object.keys(tempFileStorage);
      if (questionsToUpload.length === 0) {
        options.showSaveInProgress();

        // Clean the data before emitting to remove radio button name modifications
        const cleanedData = self.cleanDataForSaving(self.surveyModel.data);

        self.FormCompleteEvent.emit({
          formData: cleanedData,
          esourceForm,
          options,
          isComplete: true,
          formAuditTrail: currformAuditTrail,
        });
        self.surveyModel.clear(false, true);
        self.surveyModel.render();
        currformAuditTrail = [];

        return;
      } else {
        const formData = new FormData();
        for (let i = 0; i < questionsToUpload.length; i++) {
          const questionName = questionsToUpload[i];
          const question = self.surveyModel.getQuestionByName(questionName);
          const filesToUpload = tempFileStorage[questionName];
          if (filesToUpload && filesToUpload.length > 0) {
            filesToUpload.forEach((file) => {
              formData.append("documents", file);
            });
          }
        }
        formData.append("body", JSON.stringify({ subject_oid: subjectOid }));
        self._subjectManagerV2Service.uploadEsourceDocument(formData).subscribe(
          (res: any) => {
            if (res.data && res.data.length > 0) {
              // Save metadata about uploaded files as the question value
              isFileValueChange = true;
              for (let i = 0; i < questionsToUpload.length; i++) {
                // when the file controller is in dynamic pannel we split the name
                const keyParts = questionsToUpload[i].split("/");

                // Dynamic panel name
                const paneldynamicName = keyParts[0];

                // Panel index to which file has been uploaded
                const panelIndex = parseInt(keyParts[1], 10);

                // Consider this variable as name of the question if it is in dynamic panel
                const questionName = keyParts.slice(2).join("/");

                let question;

                const paneldynamic =
                  self.surveyModel.getQuestionByName(paneldynamicName);

                if (paneldynamic && paneldynamic.getType() === "paneldynamic") {
                  question =
                    paneldynamic.panels[panelIndex]?.getQuestionByName(
                      questionName
                    );
                } else {
                  // Used questionsToUpload[i] as name for simple controllers
                  question = self.surveyModel.getQuestionByName(
                    questionsToUpload[i]
                  );
                }

                const filesToUpload = tempFileStorage[questionsToUpload[i]];

                filesToUpload.forEach((file) => {
                  let uploadedFile = res.data.find(
                    (uploadedFile) => uploadedFile.name === file.name
                  );
                  if (uploadedFile) {
                    if (question) {
                      question.value = [
                        {
                          name: file.name,
                          type: file.type,
                          content: uploadedFile.contentUrl,
                          oldContent: uploadedFile.url,
                        },
                      ];
                    }
                  }
                });
              }
            }
            options.showSaveInProgress();

            // Clean the data before emitting to remove radio button name modifications
            const cleanedData = self.cleanDataForSaving(self.surveyModel.data);

            self.FormCompleteEvent.emit({
              formData: cleanedData,
              esourceForm,
              options,
              isComplete: true,
              formAuditTrail: currformAuditTrail,
            });
            self.surveyModel.clear(false, true);
            self.surveyModel.render();
            currformAuditTrail = [];
            tempFileStorage = {};
            isFileValueChange = false;
          },
          (error) => {
            const errMessage = ErrorHandlerUtil.extractErrorMessage(error);
            this._snackBarService.error(errMessage);
          }
        );
      }
    });

    if (!this.disableSubmitButton && !this.isCompareVisit) {
      // Add custom save button
      this.surveyModel.addNavigationItem({
        id: "survey_save",
        title: "Save",
        visibleIndex: 49, // The "Complete" button has the visibleIndex 50.
        action: () => {
          if (tempRemoveFile && tempRemoveFile.size > 0) {
            Array.from(tempRemoveFile).forEach((item) => {
              return new Promise((resolve) => {
                const extractedString = item?.split(",")[1];
                if (!self.isBase64(extractedString)) {
                  self._subjectManagerV2Service
                    .deleteEsourceDocument({
                      fileUrl: item,
                      subject_oid: subjectOid,
                    })
                    .subscribe({
                      next: (res) => {
                        // Remove from set after successful deletion
                        tempRemoveFile.delete(item);
                        res && resolve(true);
                      },
                      error: (error) => {
                        const errMessage = ErrorHandlerUtil.extractErrorMessage(error);
                        this._snackBarService.error(errMessage);
                      },
                    });
                }
              });
            });
          }
          const questionsToUpload = Object.keys(tempFileStorage);
          if (questionsToUpload.length === 0) {
            // Clean the data before emitting to remove radio button name modifications
            const cleanedData = self.cleanDataForSaving(this.surveyModel.data);

            self.FormCompleteEvent.emit({
              formData: cleanedData,
              esourceForm,
              options: null,
              isComplete: false,
              formAuditTrail: currformAuditTrail,
            });
            currformAuditTrail = [];

            return;
          } else {
            const formData = new FormData();
            for (let i = 0; i < questionsToUpload.length; i++) {
              const questionName = questionsToUpload[i];
              const question = self.surveyModel.getQuestionByName(questionName);
              const filesToUpload = tempFileStorage[questionName];
              if (filesToUpload && filesToUpload.length > 0) {
                filesToUpload.forEach((file) => {
                  formData.append("documents", file);
                });
              }
            }
            formData.append(
              "body",
              JSON.stringify({ subject_oid: subjectOid })
            );
            self._subjectManagerV2Service
              .uploadEsourceDocument(formData)
              .subscribe({
                next: (res: any) => {
                  if (res.data && res.data.length > 0) {
                    isFileValueChange = true;
                    for (let i = 0; i < questionsToUpload.length; i++) {
                      // when the file controller is in dynamic pannel we split the name
                      const keyParts = questionsToUpload[i].split("/");

                      // Dynamic panel name
                      const paneldynamicName = keyParts[0];

                      // Panel index to which file has been uploaded
                      const panelIndex = parseInt(keyParts[1], 10);

                      // Consider this variable as name of the question if it is in dynamic panel
                      const questionName = keyParts.slice(2).join("/");

                      let question;

                      const paneldynamic =
                        this.surveyModel.getQuestionByName(paneldynamicName);

                      if (
                        paneldynamic &&
                        paneldynamic.getType() === "paneldynamic"
                      ) {
                        question =
                          paneldynamic.panels[panelIndex]?.getQuestionByName(
                            questionName
                          );
                      } else {
                        // Used questionsToUpload[i] as name for simple controllers
                        question = this.surveyModel.getQuestionByName(
                          questionsToUpload[i]
                        );
                      }

                      const filesToUpload =
                        tempFileStorage[questionsToUpload[i]];
                      filesToUpload.forEach((file) => {
                        let uploadedFile = res.data.find(
                          (uploadedFile) => uploadedFile.name === file.name
                        );
                        if (uploadedFile) {
                          if (question) {
                            question.value = [
                              {
                                name: file.name,
                                type: file.type,
                                content: uploadedFile.contentUrl,
                                oldContent: uploadedFile.url,
                              },
                            ];
                          }
                        }
                      });
                    }
                  }
                  // Clean the data before emitting to remove radio button name modifications
                  const cleanedData = self.cleanDataForSaving(
                    this.surveyModel.data
                  );

                  self.FormCompleteEvent.emit({
                    formData: cleanedData,
                    esourceForm,
                    options: null,
                    isComplete: false,
                    formAuditTrail: currformAuditTrail,
                  });
                  currformAuditTrail = [];
                  isFileValueChange = false;
                  tempFileStorage = {};
                },
                error: (error) => {
                  console.error("Error:", error);
                  const errMessage = ErrorHandlerUtil.extractErrorMessage(error);
                  this._snackBarService.error(errMessage);
                },
              });
          }
        },
      });
    }

    // if (!this.isCompareVisit) {
    //   // Add pdf button
    //   this.surveyModel.addNavigationItem({
    //     id: "pdf-export",
    //     title: "Save as PDF",
    //     action: () => {
    //       if (customPdfAction && typeof customPdfAction === "function") {
    //         customPdfAction();
    //       } else {
    //         // Fallback to original SurveyJS PDF generation
    //         self.savePdf(
    //           this.surveyModel.data,
    //           formModel,
    //           pdfHeaderData,
    //           esourceForm,
    //           subject_esource_form,
    //           user
    //         );
    //       }
    //     },
    //   });
    // }

    // A variable that will store files until the survey is completed
    let tempFileStorage = {};

    // Handles selected files
    this.surveyModel.onUploadFiles.add((_, options) => {
      if (!isDialogCancel) {
        // File controller name
        let storageKey = options.name;

        if (
          options.question.parent &&
          options.question.parentQuestion &&
          options.question.parentQuestion.getType() === "paneldynamic"
        ) {
          //Update storageKey if file control is in dynamic panel form its name,index of panel and file controller name
          const paneldynamic = options.question.parentQuestion;
          const panel = options.question.parent;
          const panelIndex = paneldynamic.visiblePanels.indexOf(panel);
          storageKey = `${paneldynamic.name}/${panelIndex}/${options.name}`;
        }
        // Add files to the temporary storage
        if (tempFileStorage[storageKey] !== undefined) {
          tempFileStorage[storageKey] = tempFileStorage[storageKey].concat(
            options.files
          );
        } else {
          tempFileStorage[storageKey] = options.files;
        }

        // Load file previews
        const content = [];
        options.files.forEach((file) => {
          const fileReader = new FileReader();
          fileReader.onload = () => {
            content.push({
              name: file.name,
              type: file.type,
              content: fileReader.result,
              file: file,
            });
            if (content.length === options.files.length) {
              // Return a file for preview as a { file, content } object
              options.callback(
                content.map((fileContent) => {
                  return {
                    file: fileContent.file,
                    content: fileContent.content,
                  };
                })
              );
            }
          };
          fileReader.readAsDataURL(file);
        });
      }
    });

    this.surveyModel.onClearFiles.add(async (_, options) => {
      if (!options.value || options.value.length === 0)
        return options.callback("success");
      if (!options.fileName && !!options.value) {
        for (const item of options.value) {
          // Only track server URLs (avoid base64 data)
          if (typeof item.content === 'string') {
            const extractedString = item.content.split(',')[1];
            if (!this.isBase64(extractedString)) {
              tempRemoveFile.add(item.content);
            }
          }
        }
      } else {
        const fileToRemove = options.value.find(
          (item) => item.name === options.fileName
        );
        if (fileToRemove) {
          if (typeof fileToRemove.content === 'string') {
            const extractedString = fileToRemove.content.split(',')[1];
            if (!this.isBase64(extractedString)) {
              tempRemoveFile.add(fileToRemove.content);
            }
          }
        } else {
          console.error(`File with name ${options.fileName} is not found`);
        }
      }
      return options.callback("success");
    });

    // this.surveyModel.render();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["surveyData"]) {
      
      if (this.permissionsLoaded) {
        // Permissions ready, process immediately
        this.setSurveyModel(changes["surveyData"].currentValue);
      } else {
        // Permissions not ready, store for later
        this.pendingSurveyData = changes["surveyData"].currentValue;
      }
    }
  }

  pdfDocOptions: IDocOptions = {
    htmlRenderAs: "auto", // Auto will use image rendering when HTML contains img tags
    matrixRenderAs: "list",
    applyImageFit: true,
    fontSize: 12,
    margins: {
      left: 10,
      right: 10,
      top: 10,
      bot: 10,
    },
    textFieldRenderAs: "multiLine",
  };

  // Pdf print function
  savePdf = function (
    surveyData: any,
    formModel,
    pdfHeaderData,
    esourceForm,
    subject_esource_form,
    user
  ) {
    let pdfFormModel = { ...formModel };

    // Add Form Information
    if (pdfFormModel.pages[0].name !== "HeaderInfo") {
      pdfFormModel.pages = [pdfHeader, ...pdfFormModel.pages];
    }

    // // Append Audit trail data before header during single eSource Print
    if (
      pdfFormModel.pages[pdfFormModel.pages.length - 1]?.name &&
      pdfFormModel.pages[pdfFormModel.pages.length - 1]?.name !== "Audit Logs"
    ) {
      //   // TYPE-3- This code block uses type HTML control to display audit trail
      //   //##############################----START----##########################
      if (esourceForm.audit_trails.length > 0) {
        const auditDetails = {
          name: "Audit Logs",
          title: "Audit Logs: ",
          elements: [],
        };

        esourceForm?.audit_trails?.map((data, index) => {
          // Add header for each audit trail entry
          auditDetails.elements.push({
            type: "html",
            name: `auditHeader_${index}`,
            html: `<div style="padding: 40px; margin-top: 10px"><h3>${data.user.first_name} ${data.user.last_name} at ${moment(data.created_at).format("DD MMM YYYY hh:mm:ss")}</h3></div>`,
            renderAs: "standard",
          });

          // Create complete table with all rows - always render as standard
          let tableHtml = `<table style="width: 100%; border-collapse: collapse; background-color: white;">
    <thead>
        <tr style="background-color: #f0f0f0;">
            <th style="padding: 8px; border: 1px solid black; font-weight: bold;">Key</th>
            <th style="padding: 8px; border: 1px solid black; font-weight: bold;">Reason</th>
            <th style="padding: 8px; border: 1px solid black; font-weight: bold;">Old Value</th>
            <th style="padding: 8px; border: 1px solid black; font-weight: bold;">New Value</th>
            <th style="padding: 8px; border: 1px solid black; font-weight: bold;">Time</th>
        </tr>
    </thead><tbody>`;

          let imageCounter = 1;
          const imageList = [];

          data.trail_history.map((trailData, trailIndex) => {
            const oldValueHasImage = this.hasImageValue(trailData?.oldValue);
            const newValueHasImage = this.hasImageValue(trailData?.newValue);

            // Create placeholder for images with ID
            let oldValueContent = trailData?.oldValue || " - ";
            let newValueContent = trailData?.newValue || " - ";

            if (oldValueHasImage) {
              const imageId = `IMG${imageCounter++}`;
              oldValueContent = `[IMAGE ${imageId}]`;
              imageList.push({
                id: imageId,
                description: `Old Value for "${trailData?.key}"`,
                url: trailData?.oldValue.startsWith("data:image/")
                  ? trailData?.oldValue
                  : `data:image/png;base64,${trailData?.oldValue}`,
              });
            }

            if (newValueHasImage) {
              const imageId = `IMG${imageCounter++}`;
              newValueContent = `[IMAGE ${imageId}]`;
              imageList.push({
                id: imageId,
                description: `New Value for "${trailData?.key}"`,
                url: trailData?.newValue.startsWith("data:image/")
                  ? trailData?.newValue
                  : `data:image/png;base64,${trailData?.newValue}`,
              });
            }

            tableHtml += ` <tr style="background-color: white;">
              <td style="padding: 8px; border: 1px solid black;">${trailData?.key}</td>
              <td style="padding: 8px; border: 1px solid black;">${trailData?.reason}</td>
              <td style="padding: 8px; border: 1px solid black; text-align: center;">${oldValueContent}</td>
              <td style="padding: 8px; border: 1px solid black; text-align: center;">${newValueContent}</td>
              <td style="padding: 8px; border: 1px solid black;">${moment(trailData?.updated_at).format("DD MMM YYYY hh:mm:ss")}</td>
            </tr>`;
          });

          tableHtml += `</tbody></table>`;

          // Add the main table
          auditDetails.elements.push({
            type: "html",
            name: `auditTable_${index}`,
            html: tableHtml,
            renderAs: "standard",
          });

          // Add images below the table with their IDs
          imageList.forEach((image) => {
            auditDetails.elements.push({
              type: "html",
              name: `imageLabel_${image.id}`,
              html: `<div style="margin: 10px 0; font-weight: bold;">${image.id}: ${image.description}</div>`,
              renderAs: "standard",
            });

            auditDetails.elements.push({
              type: "image",
              name: `image_${image.id}`,
              imageLink: image.url,
              imageWidth: "200px",
              imageHeight: "150px",
              imageFit: "contain",
            });
          });
        });

        pdfFormModel.pages = [...pdfFormModel.pages, auditDetails];
      }

      //   //##############################----END----##########################
    }
    if (
      pdfFormModel.pages[pdfFormModel.pages.length - 1]?.name &&
      pdfFormModel.pages[pdfFormModel.pages.length - 1]?.name !== "FooterInfo"
    ) {
      pdfFormModel.pages = [...pdfFormModel.pages, pdfFooter];
    }

    SurveyHelper.FORM_BORDER_VISIBLE = true;
    SurveyHelper.MULTIPLETEXT_TEXT_PERS = 0.35;
    SurveyHelper.TITLE_PAGE_FONT_SIZE_SCALE = 1.4;
    SurveyHelper.TITLE_PANEL_FONT_SIZE_SCALE = 1.8;
    SurveyHelper.TITLE_SURVEY_FONT_SIZE_SCALE = 1.6;
    SurveyHelper.TEXT_COLOR = "black";
    SurveyHelper.VALUE_READONLY_PADDING_SCALE = 0.3;

    let data = {};
    data = Object.assign(data, {
      VisitInformation: pdfHeaderData,
    });
    if (subject_esource_form?.save_user) {
      data = Object.assign(data, {
        FooterSubmitedByInfo: {
          "Form Submit By": `${subject_esource_form?.save_user.first_name} ${subject_esource_form?.save_user.last_name}`,
          "Form Submit Date": moment(
            subject_esource_form?.save_form_date_at
          ).format("DD MMM YYYY"),
          "Form Submit Signature": `${subject_esource_form?.save_user.first_name} ${subject_esource_form?.save_user.last_name}`,
        },
      });
    }

    if (subject_esource_form?.completed_user) {
      data = Object.assign(data, {
        FooterReviewByInfo: {
          "Form Review By": `${subject_esource_form?.completed_user.first_name} ${subject_esource_form?.completed_user.last_name}`,
          "Form Review Date": moment(
            subject_esource_form?.completed_form_date_at
          ).format("DD MMM YYYY"),
          "Form Review Signature": `${subject_esource_form?.completed_user.first_name} ${subject_esource_form?.completed_user.last_name}`,
        },
      });
    }

    if (subject_esource_form?.approved_user) {
      data = Object.assign(data, {
        FooterApproveByInfo: {
          "PI Approve By": `${subject_esource_form?.approved_user.first_name} ${subject_esource_form?.approved_user.last_name}`,
          "PI Approve Date": moment(
            subject_esource_form?.approved_form_date_at
          ).format("DD MMM YYYY"),
          "PI Approve Signature": `${subject_esource_form?.approved_user.first_name} ${subject_esource_form?.approved_user.last_name}`,
        },
      });
    }

    data = Object.assign(data, this.surveyModel.data);
    data = this.changeDateFormat(pdfFormModel, data);

    // Fix IDs that start with numbers before processing the form model for PDF
    pdfFormModel = this.fixIdsStartingWithNumbers(pdfFormModel);
    pdfFormModel = this.updateLogicExpressionsForMatrixRadioButtons(pdfFormModel);
    pdfFormModel = this.changeQuestionType(pdfFormModel, true);

    const surveyPdf = new SurveyPDF(pdfFormModel, this.pdfDocOptions);

    surveyPdf.data = data;
    surveyPdf.mode = "display";
    surveyPdf.showQuestionNumbers = "off";

    // center title in every page
    surveyPdf.onRenderPage.add(function (survey, options) {
      let leftMargin =
        (options.controller.paperWidth -
          options.bricks[0].unfold()[0]["width"]) /
        2;
      options.bricks[0].unfold()[0].xLeft = leftMargin;
      options.bricks[0].unfold()[0].xRight = 0;
    });

    // Add footer
    surveyPdf.onRenderFooter.add((_, canvas: any) => {
      canvas.drawText({
        text: "Created by Davesa",
        fontSize: 10,
      });

      canvas.drawText({
        text: "Page " + canvas.pageNumber + " of " + canvas.pageCount,
        fontSize: 10,
        horizontalAlign: "Left",
        verticalAlign: "bottom",
        margins: {
          right: 12,
        },
      });
    });

    surveyPdf.save(esourceForm.name);
  };

  //Audit trail log dialog
  viewAuditDialog(label, auditHistory) {
    const dialogOptions = {
      width: "800px",
      height: "auto",
      data: {
        title: `${label} Audit Logs`,
        auditTrail: auditHistory?.sort((a, b) =>
          b.created_at.localeCompare(a.created_at)
        ),
      },
    };

    this.dialog.open(AuditTrailDialogComponent, dialogOptions);
  }

  /**
   * Clear hidden values and automatically create audit logs before form completion
   * This replaces the default SurveyJS clearInvisibleValues behavior with audit logging
   */
  private clearHiddenValuesWithAuditLogging(survey: any, currformAuditTrail: any[]) {
    if (!survey || !survey.getAllQuestions) {
      return;
    }

    const allQuestions = survey.getAllQuestions();
    const clearedFields: Array<{question: any, oldValue: any, questionTitle: string}> = [];

    // Identify questions with values that should be cleared due to visibility conditions
    allQuestions.forEach((question: any) => {
      // Check if question has a value but is currently invisible
      if (question.value !== undefined && question.value !== null && question.value !== '' && !question.isVisible) {
        const questionTitle = question.title || question.name;
        const oldValue = question.value;
        
        // Store information about the field being cleared
        clearedFields.push({
          question: question,
          oldValue: oldValue,
          questionTitle: questionTitle
        });
      }
    });

    // If there are fields to clear, create audit logs for each
    if (clearedFields.length > 0) {
      // Set flag to prevent audit dialogs during automatic clearing
      this.isSystemClearingHiddenValues = true;
      
      try {
        clearedFields.forEach(({question, oldValue, questionTitle}) => {
          // Use stored reason if available, otherwise default to "Other"
          const storedReason = this.hiddenQuestionReasons.get(question.name) || "Other";
          
          // Create audit log entry with appropriate reason
          const auditDetails = {
            key: questionTitle,
            reason: storedReason,
            oldValue: this.formatValueForAudit(oldValue, question),
            newValue: "", // Empty value since the field is being cleared
            updated_at: new Date()
          };

          currformAuditTrail.push(auditDetails);

          // Clear the question value (this will trigger onValueChanged but will be ignored due to flag)
          question.value = undefined;
        });
      } finally {
        // Reset flag after clearing is complete
        this.isSystemClearingHiddenValues = false;
      }
    }
  }

  /**
   * Format value for audit logging, handling different question types
   */
  private formatValueForAudit(value: any, question: any): string {
    if (value === null || value === undefined) {
      return "N/A";
    }

    // Determine value type for switch case
    let valueType = 'default';
    if (question.getType() === "file" && Array.isArray(value)) {
      valueType = 'file';
    } else if (typeof value === "object" && !Array.isArray(value)) {
      valueType = 'matrix';
    } else if ((question.inputType === "date" || question.inputType === "datetime-local") && value) {
      valueType = 'date';
    } else if (Array.isArray(value)) {
      valueType = 'array';
    }

    switch (valueType) {
      case 'file':
        return value.map((file) => file.name || 'Unknown file').join(", ");
      
      case 'matrix':
        return this.formatMatrixValueForAudit(value);
      
      case 'date':
        try {
          const format = question.inputType === "date" ? "DD MMM YYYY" : "DD MMM YYYY HH:mm";
          return moment(value).format(format);
        } catch (e) {
          console.log("error", e);
          return "Invalid date";
        }
      
      case 'array':
        return this.formatComplexValueForDisplay(value);
      
      default:
        return String(value);
    }
  }

  /**
   * Centralized function to format complex values for display in dialogs and audit logs
   * Handles objects, arrays, and nested structures to avoid [object Object] issues
   */
  private formatComplexValueForDisplay(value: any): string {
    if (value === null || value === undefined) {
      return 'N/A';
    }
    
    if (typeof value === 'string') {
      return value;
    }
    
    if (typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    }
    
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return '[]';
      }
      if (value.length === 1) {
        return `[${this.formatComplexValueForDisplay(value[0])}]`;
      }
      // For arrays with multiple items, show first item and count
      const firstItem = this.formatComplexValueForDisplay(value[0]);
      return `[${firstItem}, ... (${value.length} items)]`;
    }
    
    if (typeof value === 'object') {
      const entries = Object.entries(value).map(([k, v]) => 
        `${k}: ${this.formatComplexValueForDisplay(v)}`
      );
      return `{${entries.join(', ')}}`;
    }
    
    // Fallback for any other types
    return String(value);
  }

  /**
   * Create a formatted summary of panel data for audit dialogs
   * Centralizes the panel summary creation logic to avoid duplication
   */
  private createPanelSummary(panelData: any): string {
    if (!panelData || typeof panelData !== 'object') {
      return 'Empty panel';
    }

    const entries = [];
    for (const [key, value] of Object.entries(panelData)) {
      if (value !== undefined && value !== null && value !== '') {
        entries.push(`${key}: ${this.formatComplexValueForDisplay(value)}`);
      }
    }
    
    return entries.length > 0 ? entries.join(', ') : 'Empty panel';
  }

  /**
   * Track questions that become hidden after a value change and associate the reason
   */
  private trackHiddenQuestionsWithReason(survey: any, reason: string) {
    if (!survey || !survey.getAllQuestions) {
      return;
    }

    const allQuestions = survey.getAllQuestions();

    const hiddenReasons = this.hiddenQuestionReasons;
    allQuestions.forEach((question: any) => {
      if (!question || !question.name) return;
      const qName = question.name;
      const hasStoredReason = hiddenReasons.has(qName);

      if (question.isVisible === true) {
        if (hasStoredReason) {
          hiddenReasons.delete(qName);
        }
        return;
      }

      const hasValue = question.value !== undefined && question.value !== null && question.value !== '';
      if (hasValue && !hasStoredReason) {
        hiddenReasons.set(qName, reason);
      }
    });
  }

  ngOnDestroy() {
    this.procedureInfoSub?.unsubscribe();
    // Disconnect any mutation observers we created
    if (this.wheelObservers && this.wheelObservers.length > 0) {
      this.wheelObservers.forEach((obs) => {
        try { obs.disconnect(); } catch {}
      });
      this.wheelObservers = [];
    }
  }


  private checkProcedurePermissions() {
    if (this.procedureInfo) {
      if (
        !this.procedureInfo?.["esourceFormCapture"]?.isCreate ||
        !this.procedureInfo?.["esourceFormCapture"]?.isEdit
      ) {
        this.disableSubmitButton = true;
      }
    }
  }


  // change question type to view jquery datepicker
  changeQuestionType(json, isPdf) {
    let updateArray = {
      ...json,
      pages: json?.pages?.map((page) => {
        return this.changeNestedQuestionType(page, isPdf);
      }),
    };
    return updateArray;
  }

  // Fix IDs that start with numbers to ensure they start with characters
  fixIdsStartingWithNumbers(json) {
    let updateArray = {
      ...json,
      pages: json?.pages?.map((page) => {
        return this.fixNestedIdsStartingWithNumbers(page);
      }),
    };
    return updateArray;
  }

  // Strip any explicit id fields from elements used as dynamic panel templates to avoid duplicated ids
  private stripDuplicateIdsInDynamicPanelTemplates(json: any): any {
    const stripFromElement = (el: any): any => {
      if (!el || typeof el !== 'object') return el;
      // Remove top-level id if present
      if (Object.prototype.hasOwnProperty.call(el, 'id')) {
        const clone = { ...el };
        delete clone.id;
        el = clone;
      }
      // Recurse into nested panels
      if (el.type === 'panel' && Array.isArray(el.elements)) {
        return {
          ...el,
          elements: el.elements.map((child: any) => stripFromElement(child)),
        };
      }
      if (el.type === 'paneldynamic' && Array.isArray(el.templateElements)) {
        return {
          ...el,
          templateElements: el.templateElements.map((child: any) => stripFromElement(child)),
        };
      }
      return el;
    };

    if (!json || !Array.isArray(json.pages)) {
      return json;
    }
    return {
      ...json,
      pages: json.pages.map((page: any) => {
        if (!page || !Array.isArray(page.elements)) return page;
        return {
          ...page,
          elements: page.elements.map((el: any) => stripFromElement(el)),
        };
      }),
    };
  }

  // Runtime: remove `id` from a panel instance's child elements (handles cloned panels when user clicks Add New)
  private stripIdsFromPanelElements(panel: any): void {
    try {
      if (!panel || !Array.isArray(panel.elements)) return;
      const stripOnQuestion = (q: any) => {
        if (!q || typeof q !== 'object') return;
        if (Object.prototype.hasOwnProperty.call(q, 'id')) {
          q.id = q.id + "_" + Math.random().toString(36).substring(2, 15);
        }
        // Nested dynamic panel inside panel
        if (q.getType && q.getType() === 'paneldynamic' && Array.isArray(q.templateElements)) {
          q.templateElements.forEach((tpl: any) => stripOnQuestion(tpl));
        }
      };
      panel.elements.forEach((el: any) => stripOnQuestion(el));
    } catch (error) {
      console.log("error", error);
    }
  }

  // Recursively fix nested IDs that start with numbers
  fixNestedIdsStartingWithNumbers(field) {
    return {
      ...field,
      elements: field?.elements?.map((element) => {
        if (element?.type === "panel") {
          element = this.fixNestedIdsStartingWithNumbers(element);
          return element;
        } else if (element?.type === "paneldynamic") {
          element.templateElements = element.templateElements.map(
            (templateElement) => {
              return this.fixElementId(templateElement);
            }
          );
          return element;
        } else {
          return this.fixElementId(element);
        }
      }),
    };
  }

  // Fix individual element ID if it starts with a number
  fixElementId(element) {
    if (element?.id && typeof element.id === 'string' && /^\d/.test(element.id)) {
      // If ID starts with a number, prefix it with 'id_' to make it valid
      element.id = `id_${element.id}`;
    }
    return element;
  }

  // change nested question type to view jquery datepicker.
  changeNestedQuestionType(field, isPdf) {
    return {
      ...field,
      elements: field?.elements?.map((element) => {
        if (element?.type === "panel") {
          element = this.changeNestedQuestionType(element, isPdf);
          return element;
        } else if (element?.type === "paneldynamic") {
          element.templateElements = element.templateElements.map(
            (templateElement) => {
              if (templateElement?.type === "file") {
                return { ...templateElement, storeDataAsText: false };
              } else if (templateElement?.type === "paneldynamic") {
                // Handle nested dynamic panels
                return this.changeNestedQuestionType(templateElement, isPdf);
              } else {
                // Handle regular template elements
                if (!isPdf) {
                  if (templateElement?.inputType === "date") {
                    templateElement["type"] = "text";
                    templateElement["inputType"] = "date";
                  }
                  if (templateElement?.type === "file") {
                    templateElement["storeDataAsText"] = false;
                  }
                } else {
                  if (templateElement?.inputType === "date") {
                    templateElement["type"] = "text";
                    templateElement["inputType"] = "date";
                  }
                }
                return templateElement;
              }
            }
          );
          return element;
        } else {
          if (!isPdf) {
            if (element?.inputType === "date") {
              element["type"] = "text";
              element["inputType"] = "date";
            }
            if (element?.type === "file") {
              element["storeDataAsText"] = false;
            }
          } else {
            if (element?.inputType === "date") {
              element["type"] = "text";
              element["inputType"] = "date";
            }
          }

          return element;
        }
      }),
    };
  }

  // Change date format
  changeDateFormat(json, data) {
    let jsonData = { ...data };

    json?.pages?.map((page) => {
      return this.changeNestedDateFormat(page, jsonData);
    });

    return jsonData;
  }

  // Recursion function for change nested date property.
  changeNestedDateFormat(field, data) {
    return {
      ...field,
      elements: field.elements.map((element) => {
        if (element?.type === "panel") {
          element = this.changeNestedDateFormat(element, data);
          return element;
        } else {
          if (element?.inputType === "date") {
            data[element.name] = data[element.name]
              ? moment(data[element.name]).format("DD MMM YYYY")
              : data[element.name];
          }
          if (element?.inputType === "datetime-local") {
            data[element.name] = data[element.name]
              ? moment(data[element.name]).format("DD MMM YYYY HH:mm")
              : data[element.name];
          }
          return element;
        }
      }),
    };
  }

  ApproveForm() {
    let dialogRef = this.dialog.open(FormApproveDialogComponent, {
      width: "auto",
      height: "auto",
      data: {
        user_id: this.user_id,
        subject_esource_oid: this.subjectEsourceOid,
      },
      id: "",
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        if (res !== true) {
          this.PISignature = `${res.first_name} ${res.last_name}`;
        }
        // this.getUserTraining();
      }
    });
  }

  // approve form button show only when user is PI and form is completed
  getLoginUserRole(studyOid, submitStatus) {
    this._studiesV2Service.getUserRoleInStudy(studyOid).then((res: any) => {
      if (res?.data) {
        this.user_id = res.data.user_id;
      }
      if (
        res?.data &&
        res.data?.study_delegation_role_user.study_delegation_role
          .delegation_role.name === UserDelegationEnum.PI &&
        submitStatus === "completed"
      ) {
        this.approveFormPermission = true;
      } else {
        this.approveFormPermission = false;
      }
    });
  }

  isBase64(str) {
    try {
      return btoa(atob(str)) == str;
    } catch (err) {
      return false;
    }
  }

  // Helper function to check if a value contains image data
  hasImageValue(value) {
    if (!value || value === " - ") return false;
    return (
      typeof value === "string" &&
      (value.startsWith("data:image/") ||
        (value.length > 100 && this.isBase64(value)))
    );
  }

  // Helper function to create image HTML
  createImageHtml(value) {
    if (!this.hasImageValue(value)) return value || " - ";
    const imageUrl = value.startsWith("data:image/")
      ? value
      : `data:image/png;base64,${value}`;
    return `<img src="${imageUrl}" style="max-width: 100px; max-height: 80px; object-fit: contain; display: block; margin: 2px auto;" />`;
  }

  // Apply the fix to prevent SurveyJS from generating duplicate names for radio buttons
  applyMatrixRadioButtonFix(model: Model) {
    // Override the SurveyJS matrix dropdown radio button name generation
    const originalCreateElement = model.createElement;
    model.createElement = function (name: string, elementType: string) {
      const element = originalCreateElement.call(this, name, elementType);

      if (elementType === "matrixdropdown") {
        // Override the radio button name generation for this matrix
        element.getRadioButtonName = function (
          rowName: string,
          columnName: string,
          suffix?: string
        ) {
          // Generate unique radio button names that include the matrix question name
          const uniqueName = `${element.name}_${rowName}_${columnName}${suffix ? "_" + suffix : ""}`;
          return uniqueName;
        };
      }

      return element;
    }.bind(model);

    // Also apply the fix to existing matrix questions
    model.getAllQuestions().forEach((question) => {
      if (question.getType() === "matrixdropdown") {
        const matrixQuestion = question as any;

        // Override the internal radio button naming function
        if (matrixQuestion.generatedVisibleRows) {
                  matrixQuestion.generatedVisibleRows.forEach(
          (row: any, rowIndex: number) => {
            row.cells.forEach((cell: any, cellIndex: number) => {
              if (cell.question && cell.question.getType() === SurveyJSConstants.QUESTION_TYPES.RADIOGROUP) {
                  const radioQuestion = cell.question;
                  const originalName = radioQuestion.name;
                  const uniqueName = `${matrixQuestion.name}_row${rowIndex}_${originalName}`;

                  // Set unique name for this radio group
                  radioQuestion.name = uniqueName;
                }
              });
            }
          );
        }
      }
    });
  }

  // This method is called when a matrixdropdown question is rendered.
  // It ensures that the radio button names are unique and consistent.
  fixMatrixQuestionRadioButtons(question: any) {
    if (question.getType() === SurveyJSConstants.MATRIX_TYPES.MATRIX_DROPDOWN) {
      const matrixQuestion = question as any;

      // Override the internal radio button naming function
      if (matrixQuestion.generatedVisibleRows) {
        matrixQuestion.generatedVisibleRows.forEach(
          (row: any, rowIndex: number) => {
            row.cells.forEach((cell: any, cellIndex: number) => {
              if (cell.question && cell.question.getType() === SurveyJSConstants.QUESTION_TYPES.RADIOGROUP) {
                const radioQuestion = cell.question;
                const originalName = radioQuestion.name;

                // Check if name is already modified to avoid double-modification
                if (!originalName.includes("_row" + rowIndex + "_")) {
                  const uniqueName = `${matrixQuestion.name}_row${rowIndex}_${originalName}`;

                  // Set unique name for this radio group
                  radioQuestion.name = uniqueName;
                }
              }
            });
          }
        );
      }
    }
  }

  // Robust detection of the single changed cell in a matrixdropdown.
  // Returns null if no difference. Output includes row/column titles, keys, and values.
  private detectMatrixCellChange(
    previousMatrix: any,
    currentMatrix: any,
    matrixQuestion: any
  ) {
    // Ensure we're working with proper matrix objects
    if (!previousMatrix || typeof previousMatrix !== 'object' || Array.isArray(previousMatrix)) {
      return null;
    }
    
    if (!currentMatrix || typeof currentMatrix !== 'object' || Array.isArray(currentMatrix)) {
      return null;
    }
    
    // Normalize undefined
    const prev = previousMatrix;
    const curr = currentMatrix;

    // Resolve row/column metadata
    const rows: any[] = matrixQuestion.rows || [];
    const columns: any[] = matrixQuestion.columns || [];

    const getRowTitleByKey = (rowKey: string) => {
      // Try to find exact match first
      let r = rows.find((x) => {
        if (typeof x === "string") {
          return x === rowKey;
        } else if (typeof x === "object" && x !== null) {
          // Handle both value and text properties
          return x.value === rowKey || x.text === rowKey;
        }
        return false;
      });
      
      // If not found, try trimmed comparison (handle spacing issues)
      if (!r) {
        r = rows.find((x) => {
          if (typeof x === "string") {
            return x.trim() === rowKey.trim();
          } else if (typeof x === "object" && x !== null) {
            const xValue = (x.value || '').trim();
            const xText = (x.text || '').trim();
            const keyTrimmed = rowKey.trim();
            return xValue === keyTrimmed || xText === keyTrimmed;
          }
          return false;
        });
      }
      
      if (!r) {
        return rowKey;
      }
      
      if (typeof r === "string") {
        return r;
      } else if (typeof r === "object" && r !== null) {
        return r.text || r.value || rowKey;
      }
      
      return rowKey;
    };

    const getColTitleByName = (colName: string) => {
      const c = columns.find((x: any) => x.name === colName);
      return c ? (c.title || c.name) : colName;
    };

    // Get all row keys, but filter out any that look like string character indexes
    const isValidRowKey = (key: string) => {
      // Exclude pure numeric strings (these are character indexes from when SurveyJS treats string as array)
      if (/^\d+$/.test(key)) {
        return false;
      }
      // Exclude short keys that are likely string character indexes
      if (key.length <= 2 && /^[0-9a-zA-Z]$/.test(key)) {
        return false;
      }
      return true;
    };
    
    const prevKeys = Object.keys(prev).filter(isValidRowKey);
    const currKeys = Object.keys(curr).filter(isValidRowKey);
    const existingRowKeys = prevKeys.filter(key => currKeys.includes(key));
    
    for (const rowKey of existingRowKeys) {
      const prevRow = (prev as any)[rowKey] || {};
      const currRow = (curr as any)[rowKey] || {};
      
      // Skip if either row is not a valid object (matrix rows should be objects with column data)
      if (typeof prevRow !== 'object' || typeof currRow !== 'object' || 
          Array.isArray(prevRow) || Array.isArray(currRow)) {
        continue;
      }

      // Iterate through union of column keys within the row
      const colKeys = Array.from(
        new Set([...Object.keys(prevRow), ...Object.keys(currRow)])
      );
      
      for (const colKey of colKeys) {
        let oldVal = (prevRow as any)[colKey];
        let newVal = (currRow as any)[colKey];
        
        // Handle radio button columns with modified names
        let actualColumnName = colKey;
        if (colKey.includes('_row') && colKey.includes('_')) {
          // This is a modified radio button name, extract the original column name
          const parts = colKey.split('_');
          if (parts.length >= 2) {
            actualColumnName = parts[parts.length - 1]; // Get the last part (e.g., "Y-N")
            
            // For modified radio button columns, the new value is in the modified column
            // and the old value should be from the actual column in the previous row
            const actualOldVal = (prevRow as any)[actualColumnName];
            const modifiedNewVal = newVal; // The value from the modified radio button column
            
            // Use the previous value from the actual column and new value from modified column
            oldVal = actualOldVal;
            newVal = modifiedNewVal;
          }
        }
        
        if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
          const rowTitle = getRowTitleByKey(rowKey);
          const columnTitle = getColTitleByName(actualColumnName); // Use actual column name for title
          
          const change = {
            rowKey,
            columnName: actualColumnName, // Use actual column name for cleaner audit trail
            rowTitle: rowTitle,
            columnTitle: columnTitle,
            oldValue: this.formatAuditValue(oldVal),
            newValue: this.formatAuditValue(newVal),
            originalColumnKey: colKey, // Keep track of original key for debugging
          };
          
          return change;
        }
      }
    }
    
    // Additional check: Look for radio button changes that weren't caught in the main loop
    // Only check existing rows for radio button modifications
    for (const rowKey of existingRowKeys) {
      const prevRow = (prev as any)[rowKey] || {};
      const currRow = (curr as any)[rowKey] || {};
      
      // Look for radio button modification keys in current row that don't exist in previous row
      const currColKeys = Object.keys(currRow);
      for (const colKey of currColKeys) {
        if (colKey.includes('_row') && colKey.includes('_') && !prevRow.hasOwnProperty(colKey)) {
          // Extract original column name
          const parts = colKey.split('_');
          if (parts.length >= 2) {
            const actualColumnName = parts[parts.length - 1];
            
            const oldVal = prevRow[actualColumnName];
            const newVal = currRow[colKey];
            
            if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
              const rowTitle = getRowTitleByKey(rowKey);
              const columnTitle = getColTitleByName(actualColumnName);
              
              const change = {
                rowKey,
                columnName: actualColumnName,
                rowTitle: rowTitle,
                columnTitle: columnTitle,
                oldValue: this.formatAuditValue(oldVal),
                newValue: this.formatAuditValue(newVal),
                originalColumnKey: colKey,
                detectionMethod: 'radio-button-scan'
              };
              
              return change;
            }
          }
        }
      }
    }
    
    return null;
  }

  /**
   * Clean matrix data by removing SurveyJS internal radio button modifications
   * Returns a clean matrix object suitable for storage and comparison
   */
  private cleanMatrixDataForStorage(matrixData: any, questionName: string): any {
    if (!matrixData || typeof matrixData !== 'object' || Array.isArray(matrixData)) {
      return {};
    }

    const cleaned: any = {};
    
    for (const [rowKey, rowValue] of Object.entries(matrixData)) {
      if (rowValue && typeof rowValue === 'object' && !Array.isArray(rowValue)) {
        const cleanedRow: any = {};
        
        for (const [colKey, colValue] of Object.entries(rowValue)) {
          // Check if this is a modified radio button name (e.g., "matrixName_rowX_columnName")
          const radioNameMatch = colKey.match(new RegExp(`^${questionName}_row\\d+_([^_]+)$`));
          
          if (radioNameMatch) {
            const originalColumnName = radioNameMatch[1];
            cleanedRow[originalColumnName] = colValue;
          } else {
            // If it's a regular column name, just copy it.
            cleanedRow[colKey] = colValue;
          }
        }
        
        // Only include the row if it has valid column data
        if (Object.keys(cleanedRow).length > 0) {
          cleaned[rowKey] = cleanedRow;
        }
      }
    }
    
    return cleaned;
  }

  /**
   * Update the current matrix values to match modified radio button values
   * This ensures that clean column values (e.g., "Y-N") match their corresponding modified radio button values
   * Modifies the matrix in place
   */
  private updateCurrentMatrixValues(matrixData: any, questionName: string): void {
    if (!matrixData || typeof matrixData !== 'object' || Array.isArray(matrixData)) {
      return;
    }

    for (const [rowKey, rowValue] of Object.entries(matrixData)) {
      if (rowValue && typeof rowValue === 'object' && !Array.isArray(rowValue)) {
        for (const [colKey, colValue] of Object.entries(rowValue)) {
          const radioNameMatch = colKey.match(new RegExp(`^${questionName}_row\\d+_([^_]+)$`));
          
          if (radioNameMatch) {
            const originalColumnName = radioNameMatch[1];
            const oldValue = rowValue[originalColumnName];
            rowValue[originalColumnName] = colValue;
          }
        }
      }
    }
  }

  /**
   * Ensure each matrix dropdown cell has unique DOM IDs to prevent the browser
   * from restoring focus to the first element with a duplicate id (which causes scrolling).
   * We update:
   * - the combobox container id
   * - the input id and its aria-controls
   * - the popup listbox id
   */
  private fixMatrixDropdownIds(question: any, containerElement?: HTMLElement | null): void {
    try {
      // Locate the DOM container for this matrix question
      let root: Element | null = null;
      if (containerElement) {
        root = containerElement as Element;
      } else {
        // Fallback: find by data-name attribute generated by SurveyJS
        root = document.querySelector(`[data-name="${question.name}"]`);
      }
      if (!root) return;

      // For each table row in the matrix, fix dropdown-related ids
      const rows = root.querySelectorAll(SurveyJSConstants.CSS_CLASSES.TABLE_ROW);
      rows.forEach((rowEl, rowIndex) => {
        // Find all dropdowns in this row (supports multiple columns)
        const dropdownRoots = rowEl.querySelectorAll(SurveyJSConstants.CSS_CLASSES.DROPDOWN_INPUT);
        dropdownRoots.forEach((dropdownRootEl, colIndex) => {
          const dropdownRoot = dropdownRootEl as HTMLElement;
          // Build a stable unique base id
          const base = `${question.name}_row${rowIndex}_col${colIndex}`
            .replace(/\s+/g, '_')
            .replace(/[^A-Za-z0-9_\-]/g, '_');

          // Update combobox container id
          dropdownRoot.id = `${base}`;

          // Update the input id and aria-controls
          const inputEl = dropdownRoot.querySelector(SurveyJSConstants.CSS_CLASSES.DROPDOWN_FILTER_INPUT) as HTMLInputElement | null;
          if (inputEl) {
            inputEl.id = `${base}_input`;
            inputEl.setAttribute('aria-controls', `${base}_list`);
            inputEl.setAttribute('aria-label', `row ${rowIndex + 1}, column ${colIndex + 1}`);
          }

          // Update the popup listbox id within the same cell if present
          const listBoxEl = rowEl.querySelector(SurveyJSConstants.CSS_CLASSES.LISTBOX) as HTMLElement | null;
          if (listBoxEl) {
            listBoxEl.id = `${base}_list`;
          }
        });
      });
    } catch (e) {
      // Fail-safe: do not throw; logging only for debugging
      console.error('fixMatrixDropdownIds error:', e);
    }
  }

  /**
   * Unified panel control ID fixer for both static and dynamic panels.
   * - For dynamic panels, uses: parentQuestion.name + panelIndex + child question name
   * - For static panels, uses: panel.name + child question name
   */
  private fixPanelControlIds(panel: any, panelContainer?: HTMLElement | null): void {
    try {
      if (!panel || !panelContainer) return;

      const isDynamic = !!(panel.parentQuestion && panel.parentQuestion.getType?.() === SurveyJSConstants.QUESTION_TYPES.PANEL_DYNAMIC);
      const panelIndex = isDynamic ? (panel.parentQuestion.visiblePanels?.indexOf(panel) ?? -1) : -1;
      const elements: any[] = Array.isArray(panel.elements) ? panel.elements : [];

      elements.forEach((childQuestion: any, childIdx: number) => {
        if (!childQuestion || typeof childQuestion.getType !== 'function') return;

        const qName: string = childQuestion.name || `q_${childIdx}`;
        const qContainer = panelContainer.querySelector(`[data-name="${qName}"]`) as HTMLElement | null;
        if (!qContainer) {
          return;
        }

        const base = (isDynamic
          ? `${panel.parentQuestion.name}_panel${panelIndex}_${qName}`
          : `${panel.name || 'panel'}_${qName}`)
          .replace(/\s+/g, '_')
          .replace(/[^A-Za-z0-9_\-]/g, '_');


        // Dropdown-specific handling
        if (childQuestion.getType() === SurveyJSConstants.QUESTION_TYPES.DROPDOWN) {
          const dropdownRoot = qContainer.querySelector(SurveyJSConstants.CSS_CLASSES.DROPDOWN_INPUT) as HTMLElement | null;
          if (dropdownRoot) {
            dropdownRoot.id = `${base}`;
            
            const inputEl = dropdownRoot.querySelector(SurveyJSConstants.CSS_CLASSES.DROPDOWN_FILTER_INPUT) as HTMLInputElement | null;
            if (inputEl) {
              inputEl.id = `${base}_input`;
              inputEl.setAttribute('aria-controls', `${base}_list`);
              inputEl.setAttribute('aria-label', childQuestion.title || qName);
            }
            const listBoxEl = qContainer.querySelector(SurveyJSConstants.CSS_CLASSES.LISTBOX) as HTMLElement | null;
            if (listBoxEl) {
              listBoxEl.id = `${base}_list`;
            }
          }
        }

        // Generic controls in the question container (input/textarea/select)
        const controls = qContainer.querySelectorAll('input, textarea, select');
        let controlIndex = 0;
        controls.forEach((ctrl: Element) => {
          const element = ctrl as HTMLElement & { id?: string };
          if (element.matches && element.matches(SurveyJSConstants.CSS_CLASSES.DROPDOWN_FILTER_INPUT)) {
            return;
          }
          // Do not override IDs for custom widget inputs we inject (marked via data-question-name)
          if ((element as HTMLElement).hasAttribute('data-question-name')) {
            return;
          }
          // Skip hidden inputs
          if ((element as HTMLInputElement).type && (element as HTMLInputElement).type.toLowerCase() === 'hidden') {
            return;
          }
          const newId = `${base}_ctrl${controlIndex++}`;
          if (element.id !== newId) {
            const oldId = element.id;
            element.id = newId;
            if (oldId) {
              const labels = qContainer.querySelectorAll(`label[for="${oldId}"]`);
              labels.forEach((lbl) => ((lbl as HTMLLabelElement).htmlFor = newId));
            }
          }
        });
      });

      // Check for duplicates after fixing
      // setTimeout(() => this.checkForDuplicateIds(), 100);
    } catch (e) {
      console.error('fixPanelControlIds error:', e);
    }
  }

  /**
   * Observe dropdown popups within a container and ensure the listbox ids match
   * the input's aria-controls to avoid aria focus confusion.
   */
  private ensureDropdownPopupAria(container: HTMLElement): void {
    try {
      if (!container) return;
      const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (m.type === 'childList' && m.addedNodes && m.addedNodes.length > 0) {
            m.addedNodes.forEach((node) => {
              const el = node as HTMLElement;
              if (!el || !el.querySelector) return;
              const listboxes = el.querySelectorAll('ul[role="listbox"]');
              listboxes.forEach((lb) => {
                // Find nearest input with aria-controls in the panel container
                const input = container.querySelector('input[aria-controls]') as HTMLInputElement | null;
                if (input && input.getAttribute('aria-controls')) {
                  lb.id = input.getAttribute('aria-controls')!;
                }
              });
            });
          }
        }
      });
      observer.observe(container, { childList: true, subtree: true });
      this.popupObservers.push(observer);
    } catch {}
  }

  /**
   * Wire clicks on SurveyJS generated headers/titles to focus the first focusable control
   * within the same question, without scrolling.
   */
  private wireSurveyTitleAndHeaderClicks(container: HTMLElement): void {
    try {
      if (!container) return;
      const headers = container.querySelectorAll(
        '.sd-element__header, .sd-question__header, .sd-element__title, .sd-question__title, [id$="_ariaTitle"]'
      );
      headers.forEach((header) => {
        const h = header as HTMLElement;
        if (h.hasAttribute('data-sv-title-wired')) return;
        h.setAttribute('data-sv-title-wired', 'true');

        // Find the closest question container
        const questionContainer = h.closest('[data-name]') as HTMLElement | null;
        if (!questionContainer) return;

        const handle = (e: Event) => {
          // Avoid interfering with internal buttons/actions inside header
          const target = e.target as HTMLElement;
          if (target.closest('button, a, [role="button"]')) return;

          e.preventDefault();
          e.stopPropagation();
        };

        // Capture early to beat any bubbling handlers added by SurveyJS/Angular
        h.addEventListener('pointerdown', handle, { capture: true });
        h.addEventListener('mousedown', handle, { capture: true });
        h.addEventListener('click', handle, { capture: true });
      });
    } catch (e) {
      console.error('wireSurveyTitleAndHeaderClicks error:', e);
    }
  }

  formatAuditValue(value: any): string {
    if (value === null || value === undefined) {
      return "N/A";
    }
    if (typeof value === "string") {
      return value;
    }
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    return String(value);
  }

  formatMatrixValueForAudit(matrixValue: any): string {
    if (!matrixValue || typeof matrixValue !== "object") {
      return this.formatAuditValue(matrixValue);
    }

    const formattedRows: string[] = [];

    for (const rowKey in matrixValue) {
      if (matrixValue.hasOwnProperty(rowKey)) {
        const rowData = matrixValue[rowKey];
        if (!rowData || typeof rowData !== "object") {
          continue;
        }

        const cleanRowData: any = {};

        // Clean up the row data by removing the modified radio button names
        for (const colKey in rowData) {
          if (rowData.hasOwnProperty(colKey)) {
            // Skip the modified radio button names
            if (colKey.includes("_row") && colKey.includes("_")) {
              continue;
            }
            cleanRowData[colKey] = rowData[colKey];
          }
        }

        if (Object.keys(cleanRowData).length > 0) {
          const rowEntries = Object.entries(cleanRowData)
            .map(([key, value]) => `${key}: ${this.formatAuditValue(value)}`)
            .join(", ");
          formattedRows.push(`${rowKey}: { ${rowEntries} }`);
        } else {
          // Show empty row if no clean data
          formattedRows.push(`${rowKey}: { (no data) }`);
        }
      }
    }

    return formattedRows.length > 0
      ? formattedRows.join("; ")
      : "(empty matrix)";
  }

  // Helper method to get cell question for matrix cell access
  private getMatrixCellQuestion(matrixQuestion: any, rowKey: string, columnName: string): any {
    if (!matrixQuestion.generatedVisibleRows) {
      return null;
    }

    const rowIndex = getRowIndex(rowKey, matrixQuestion);
    if (rowIndex < 0 || rowIndex >= matrixQuestion.generatedVisibleRows.length) {
      return null;
    }

    const row = matrixQuestion.generatedVisibleRows[rowIndex];
    if (!row.cells) {
      return null;
    }

    const cell = row.cells.find((cell: any) => {
      return cell.column && cell.column.name === columnName;
    });

    return cell ? cell.question : null;
  }

  // Surgical matrix cell revert that only affects the changed cell
  private revertMatrixCellSurgically(
    matrixQuestion: any, 
    change: any, 
    prevMatrix: any, 
    currentMatrix: any
  ): any {
    if (!change || !change.rowKey || !change.columnName) {
      return null;
    }

    try {
      // Detect comment-only changes; if so, only revert the comment value and do not alter other data
      const isCommentChange = typeof change.columnName === 'string' && change.columnName.endsWith('-Comment');
      const baseColumnName = getBaseColumnName(change.columnName);

      if (isCommentChange) {
        const prevRowData = prevMatrix[change.rowKey];
        const prevCommentValue = prevRowData && typeof prevRowData === 'object'
          ? prevRowData[change.columnName]
          : undefined;

        let newMatrixValue: any = null;
        const rowIndex = getRowIndex(change.rowKey, matrixQuestion);
        if (rowIndex >= 0) {
          const commentRadioName = buildCommentRadioName(matrixQuestion.name, rowIndex, baseColumnName);

          newMatrixValue = applyMatrixCommentRevert(
            currentMatrix,
            prevRowData,
            change.rowKey,
            change.columnName,
            commentRadioName,
            prevCommentValue
          );
        }
        if (!newMatrixValue) {
          newMatrixValue = JSON.parse(JSON.stringify(currentMatrix));
        }
        // Update the UI by setting the cell question's comment and re-rendering
        try {
          const cellQuestionForComment = this.getMatrixCellQuestion(matrixQuestion, change.rowKey, baseColumnName);
          updateCellQuestionComment(cellQuestionForComment, prevCommentValue);
        } catch (commentUiError) {
          console.warn('Failed to update cell question comment UI:', commentUiError);
        }
        return newMatrixValue;
      }

      // Get the cell question for direct manipulation
      const cellQuestion = this.getMatrixCellQuestion(matrixQuestion, change.rowKey, change.columnName);
      
      if (!cellQuestion) {
        console.warn('Could not find cell question revert');
        return null;
      }

      // Get the previous value for this specific cell
      const prevRowData = prevMatrix[change.rowKey];
      const prevCellValue = prevRowData && typeof prevRowData === 'object' 
        ? prevRowData[change.columnName] 
        : undefined;

      // Create a new matrix value based on current state
      const newMatrixValue = JSON.parse(JSON.stringify(currentMatrix));
      
      if (!newMatrixValue[change.rowKey]) {
        newMatrixValue[change.rowKey] = {};
      }

      // Set the clean column value
      newMatrixValue[change.rowKey][change.columnName] = prevCellValue;
      
      // Also revert the associated comment field for this cell if present in previous data
      const commentKeyForCell = `${change.columnName}-Comment`;
      if (prevRowData && Object.prototype.hasOwnProperty.call(prevRowData, commentKeyForCell)) {
        newMatrixValue[change.rowKey][commentKeyForCell] = prevRowData[commentKeyForCell];
      }
      
      // Handle radio button value synchronization
      const rowIndex = getRowIndex(change.rowKey, matrixQuestion);
      if (rowIndex >= 0) {
        const radioButtonName = `${matrixQuestion.name}_row${rowIndex}_${change.columnName}`;
        
        // Check if previous data had a radio button value
        if (prevRowData && prevRowData[radioButtonName] !== undefined) {
          // Restore the original radio button value
          newMatrixValue[change.rowKey][radioButtonName] = prevRowData[radioButtonName];
        } else {
          // Ensure radio button value matches clean value for UI consistency
          newMatrixValue[change.rowKey][radioButtonName] = prevCellValue;
        }
      }

      // Set the cell question value directly AFTER updating the matrix structure
      // This ensures both internal state and UI are synchronized
      cellQuestion.value = prevCellValue;

      // Trigger cell question re-render to ensure UI update
      setTimeout(() => {
        try {
          if (cellQuestion.render && typeof cellQuestion.render === 'function') {
            cellQuestion.render();
          }
        } catch (renderError) {
          console.warn('Cell question render failed:', renderError);
        }
      }, 10);

      return newMatrixValue;
    } catch (error) {
      console.error('Surgical revert failed:', error);
      return null;
    }
  }

  reconstructMatrixValueWithRadioNames(
    cleanValue: any,
    matrixQuestion: any
  ): any {
    // If cleanValue is not a proper matrix object, don't reconstruct
    if (!cleanValue || typeof cleanValue !== "object" || Array.isArray(cleanValue)) {
      return {};
    }
    
    // Additional validation: ensure cleanValue looks like a matrix (has row-like keys)
    const keys = Object.keys(cleanValue);
    const hasMatrixStructure = keys.some(key => {
      const value = cleanValue[key];
      return value && typeof value === 'object' && !Array.isArray(value);
    });
    
    if (!hasMatrixStructure) {
      return {};
    }

    const reconstructedValue = JSON.parse(JSON.stringify(cleanValue)); // Deep copy

    // Get the matrix structure
    const rows = matrixQuestion.rows || [];

    // For each row in cleanValue, add the radio button names
    for (const [rowName, rowData] of Object.entries(cleanValue)) {
      if (typeof rowData === "object" && rowData !== null) {
        // Find the row index with better matching logic
        let rowIndex = rows.findIndex((row: any) => {
          if (typeof row === "string") {
            return row === rowName || row.trim() === rowName.trim();
          } else if (typeof row === "object" && row !== null) {
            return row.value === rowName || row.text === rowName ||
                   (row.value && row.value.trim() === rowName.trim()) ||
                   (row.text && row.text.trim() === rowName.trim());
          }
          return false;
        });

        if (rowIndex >= 0) {
          // For each field in this row, create the radio button name
          for (const [fieldName, fieldValue] of Object.entries(rowData)) {
            if (fieldValue !== undefined && fieldValue !== null) {
              // Generate the radio button name that SurveyJS expects
              const radioButtonName = `${matrixQuestion.name}_row${rowIndex}_${fieldName}`;
              reconstructedValue[rowName][radioButtonName] = fieldValue;
            }
          }
        }
      }
    }

    return reconstructedValue;
  }

  // Update logic expressions to match modified radio button names
  updateLogicExpressionsForMatrixRadioButtons(formModel: any): any {
    const updatedModel = JSON.parse(JSON.stringify(formModel)); // Deep copy
    
    // First, build a mapping of matrix questions and their row structures
    const matrixMapping = new Map<string, any>();
    // Also build a mapping of ALL question names (regular questions too)
    const questionNameMapping = new Map<string, string>();
    
    // Scan all pages for matrix dropdown questions and all question names
    updatedModel.pages?.forEach((page: any) => {
      this.scanPageForAllQuestions(page, matrixMapping, questionNameMapping);
    });
    
    // Now update all logic expressions in all elements
    updatedModel.pages?.forEach((page: any) => {
      this.updateLogicExpressionsInPage(page, matrixMapping, questionNameMapping);
    });
    
    return updatedModel;
  }
  
  // Recursively scan page elements for ALL questions (matrix dropdown and regular)
  private scanPageForAllQuestions(pageOrElement: any, matrixMapping: Map<string, any>, questionNameMapping: Map<string, string>) {
    if (pageOrElement.elements) {
      pageOrElement.elements.forEach((element: any) => {
        if (element.name) {
          // Check if this question name has a suffix pattern (ends with UUID-like string)
          const suffixMatch = element.name.match(/^(.+)(_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/);
          if (suffixMatch) {
            const baseName = suffixMatch[1];
            const fullName = element.name;
            // Map short name to full name
            questionNameMapping.set(baseName, fullName);
          }
          
          if (SurveyJSConstants.isMatrixType(element.type)) {
            // Create a map of column names to their cell types
            const columnTypes = new Map<string, string>();
            if (element.columns && Array.isArray(element.columns)) {
              element.columns.forEach((column: any) => {
                const columnName = column.name || column.value || '';
                const cellType = column.cellType || SurveyJSConstants.CELL_TYPES.TEXT;
                columnTypes.set(columnName, cellType);
              });
            }
            
            // Store matrix info for reference mapping
            matrixMapping.set(element.name, {
              type: element.type,
              columnTypes: columnTypes,
              rows: element.rows || [],
              columns: element.columns || []
            });
          }
        }
        
        if (element.type === SurveyJSConstants.QUESTION_TYPES.PANEL || element.type === SurveyJSConstants.QUESTION_TYPES.PANEL_DYNAMIC) {
          // Recursively scan panels
          this.scanPageForAllQuestions(element, matrixMapping, questionNameMapping);
        } else if (SurveyJSConstants.isMatrixType(element.type) && element.templateElements) {
          // Also scan template elements in matrix types
          element.templateElements.forEach((templateElement: any) => {
            if (templateElement.name) {
              const suffixMatch = templateElement.name.match(/^(.+)(_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/);
              if (suffixMatch) {
                const baseName = suffixMatch[1];
                const fullName = templateElement.name;
                questionNameMapping.set(baseName, fullName);
              }
            }
          });
        }
      });
    }
  }
  
  // Recursively update logic expressions in page elements
  private updateLogicExpressionsInPage(pageOrElement: any, matrixMapping: Map<string, any>, questionNameMapping: Map<string, string>) {
    if (pageOrElement.elements) {
      pageOrElement.elements.forEach((element: any) => {
        // Update logic expressions for ALL element types, not just matrix dropdown
        this.updateElementLogicExpressions(element, matrixMapping, questionNameMapping);
        
        // Recursively handle panels and matrix template elements
        if (element.type === SurveyJSConstants.QUESTION_TYPES.PANEL || element.type === SurveyJSConstants.QUESTION_TYPES.PANEL_DYNAMIC) {
          this.updateLogicExpressionsInPage(element, matrixMapping, questionNameMapping);
        } else if (SurveyJSConstants.isMatrixType(element.type) && element.templateElements) {
          // Also update logic expressions in matrix template elements
          element.templateElements.forEach((templateElement: any) => {
            this.updateElementLogicExpressions(templateElement, matrixMapping, questionNameMapping);
          });
        }
      });
    }
  }
  
  // Update logic expressions for a single element
  private updateElementLogicExpressions(element: any, matrixMapping: Map<string, any>, questionNameMapping: Map<string, string>) {
    const logicProperties = SurveyJSConstants.LOGIC_PROPERTIES;
    
    logicProperties.forEach(prop => {
      if (element[prop]) {
        if (typeof element[prop] === 'string') {
          element[prop] = this.updateExpressionString(element[prop], matrixMapping, questionNameMapping);
        } else if (Array.isArray(element[prop])) {
          // Handle arrays like validators
          element[prop] = element[prop].map((item: any) => {
            if (typeof item === 'object' && item.expression) {
              item.expression = this.updateExpressionString(item.expression, matrixMapping, questionNameMapping);
            }
            return item;
          });
        }
      }
    });
  }
  
  // Update a single expression string
  private updateExpressionString(expression: string, matrixMapping: Map<string, any>, questionNameMapping: Map<string, string>): string {
    let updatedExpression = expression;
    
    // Pattern to match all references: {questionName} or {matrixName.rowValue.columnName}
    const refPattern = /\{([^}]+)\}/g;
    
    updatedExpression = updatedExpression.replace(refPattern, (match, reference) => {
      // Check if this is a matrix reference (has dots) or a simple question reference
      const parts = reference.split('.');
      
      if (parts.length >= 3) {
        // This is a matrix reference: matrixName.rowValue.columnName
        const referencedMatrixName = parts[0];
        const rowValue = parts.slice(1, -1).join('.'); // Handle row values with dots
        const columnName = parts[parts.length - 1];
        
        // Find the actual matrix name that matches the referenced name
        let actualMatrixName = null;
        let matrixInfo = null;
        
        // First try exact match
        if (matrixMapping.has(referencedMatrixName)) {
          actualMatrixName = referencedMatrixName;
          matrixInfo = matrixMapping.get(referencedMatrixName);
        } else {
          // Try to find a matrix name that starts with the referenced name
          for (const [fullMatrixName, info] of matrixMapping.entries()) {
            if (fullMatrixName.startsWith(referencedMatrixName + '_')) {
              actualMatrixName = fullMatrixName;
              matrixInfo = info;
              break;
            }
          }
        }
        
        if (actualMatrixName && matrixInfo) {
          // Check if the specific column being referenced is a radio button
          const columnTypes = matrixInfo.columnTypes || new Map();
          const isRadioColumn = columnTypes.get(columnName) === SurveyJSConstants.CELL_TYPES.RADIOGROUP;
          
          if (isRadioColumn) {
            // For radio button columns, use the original logic with row/column suffixes
            // Find the row index for this row value
            let rowIndex = -1;
            if (Array.isArray(matrixInfo.rows)) {
              rowIndex = matrixInfo.rows.findIndex((row: any) => {
                if (typeof row === 'string') {
                  return row === rowValue;
                } else if (typeof row === 'object') {
                  return row.value === rowValue || row.text === rowValue;
                }
                return false;
              });
            }
            
            if (rowIndex >= 0) {
              // Generate the modified name that matches what the radio button fix creates
              const modifiedColumnName = `${actualMatrixName}_row${rowIndex}_${columnName}`;
              const newReference = `${actualMatrixName}.${rowValue}.${modifiedColumnName}`;
              return `{${newReference}}`;
            }
          } else {
            // For non-radio columns (dropdown, text, etc.), just update the matrix name with UUID
            // Keep the original reference structure: {matrixName.rowValue.columnName}
            const newReference = `${actualMatrixName}.${rowValue}.${columnName}`;
            return `{${newReference}}`;
          }
        }
      } else if (parts.length === 1) {
        // This is a simple question reference: {questionName}
        const questionName = parts[0];
        
        // Check if we have a mapping for this question name
        if (questionNameMapping.has(questionName)) {
          const fullQuestionName = questionNameMapping.get(questionName);
          return `{${fullQuestionName}}`;
        }
      }
      
      // Return original if no modification needed
      return match;
    });
    
    return updatedExpression;
  }

  cleanDataForSaving(data: any) {
    const cleanedData: any = {};

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];

        if (
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
        ) {
          // This might be matrix data - check if it has row data structure
          const hasMatrixStructure = Object.values(value).some(
            (rowValue) =>
              typeof rowValue === "object" &&
              rowValue !== null &&
              !Array.isArray(rowValue)
          );

          if (hasMatrixStructure) {
            // Handle matrix dropdown data
            const transformedMatrixData: any = {};

            for (const rowKey in value) {
              if (value.hasOwnProperty(rowKey)) {
                const rowData = value[rowKey];
                const transformedRowData: any = {};

                for (const cellKey in rowData) {
                  if (rowData.hasOwnProperty(cellKey)) {
                    // Check if this is a modified radio button name that needs to be reverted
                    let originalCellKey = cellKey;
                    if (cellKey.includes("_row") && cellKey.includes("_")) {
                      // Extract original name by removing our modifications
                      // The pattern is: originalName_rowX_originalName_rowX_...originalName
                      // We want to extract the last originalName part
                      const lastUnderscoreIndex = cellKey.lastIndexOf("_");
                      if (lastUnderscoreIndex > -1) {
                        originalCellKey = cellKey.substring(
                          lastUnderscoreIndex + 1
                        );
                      }
                    }
                    transformedRowData[originalCellKey] = rowData[cellKey];
                  }
                }
                transformedMatrixData[rowKey] = transformedRowData;
              }
            }
            cleanedData[key] = transformedMatrixData;
          } else {
            // Not matrix data, keep as is
            cleanedData[key] = value;
          }
        } else {
          // Handle regular fields and arrays (keep existing logic)
          if (typeof value === "string") {
            try {
              const parsedValue = JSON.parse(value);
              if (Array.isArray(parsedValue) && parsedValue.length > 0) {
                cleanedData[key] = parsedValue.map((item: any) => {
                  if (item.name && item.contentUrl) {
                    return {
                      name: item.name,
                      type: item.type,
                      content: item.contentUrl,
                      oldContent: item.url,
                    };
                  }
                  return item;
                });
              } else {
                cleanedData[key] = value;
              }
            } catch (e) {
              cleanedData[key] = value;
            }
          } else if (Array.isArray(value)) {
            cleanedData[key] = value.map((item: any) => {
              if (item.name && item.contentUrl) {
                return {
                  name: item.name,
                  type: item.type,
                  content: item.contentUrl,
                  oldContent: item.url,
                };
              }
              return item;
            });
          } else {
            cleanedData[key] = value;
          }
        }
      }
    }

    return cleanedData;
  }

  /**
   * Prevents mouse wheel from changing input values on hover
   * This fixes the issue where scrolling over date/number inputs changes their values
   */
  private preventWheelOnInputFields(): void {
    // Find SurveyJS root containers (support both old sv- and new sd- classnames)
    const containers = document.querySelectorAll(
      SurveyJSConstants.CSS_CLASSES.ROOT_CONTAINERS
    );
    if (!containers || containers.length === 0) return;

    const handleWheelEvent = (event: WheelEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // Only act on input elements
      if (target.tagName === 'INPUT') {
        const inputElement = target as HTMLInputElement;
        const inputType = (inputElement.type || '').toLowerCase();

        // Prevent wheel events on input types that are commonly changed by scroll
        // Include text because custom date widgets use text inputs
        const wheelPreventTypes = [
          SurveyJSConstants.INPUT_TYPES.NUMBER, 
          SurveyJSConstants.INPUT_TYPES.DATE, 
          SurveyJSConstants.INPUT_TYPES.DATETIME_LOCAL, 
          SurveyJSConstants.INPUT_TYPES.TIME, 
          SurveyJSConstants.QUESTION_TYPES.TEXT
        ];
        if (
          wheelPreventTypes.includes(inputType as any) ||
          inputElement.hasAttribute('data-question-name')
        ) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    };

    containers.forEach((container) => {
      const htmlEl = container as HTMLElement & { dataset?: DOMStringMap };
      const isContainerPatched = htmlEl.dataset?.wheelPatched === 'true';

      // Attach container-level handler once
      if (!isContainerPatched) {
        htmlEl.addEventListener('wheel', handleWheelEvent, { passive: false });
        // For legacy browsers that still fire mousewheel
        htmlEl.addEventListener('mousewheel', handleWheelEvent as any, { passive: false } as any);
        if (htmlEl.dataset) {
          htmlEl.dataset.wheelPatched = 'true';
        }
      }

      // Always scan inputs to attach per-input listener for newly created inputs
      const inputs = htmlEl.querySelectorAll('input, input[data-question-name]');
      inputs.forEach((input) => {
        const inp = input as HTMLElement & { dataset?: DOMStringMap };
        if (inp.dataset?.wheelPatched === 'true') return;
        input.addEventListener(
          'wheel',
          (event: Event) => {
            event.preventDefault();
            event.stopPropagation();
          },
          { passive: false }
        );
        if (inp.dataset) {
          inp.dataset.wheelPatched = 'true';
        }
      });

      // Install a mutation observer once per container to auto-patch future inputs
      const isObserverAttached = htmlEl.dataset?.wheelObserverAttached === 'true';
      if (!isObserverAttached) {
        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
              mutation.addedNodes.forEach((node) => {
                if (!(node instanceof HTMLElement)) return;
                // Find any inputs inside this added subtree
                const addedInputs = (node.matches?.('input') ? [node] : Array.from(node.querySelectorAll?.('input') || [])) as HTMLElement[];
                addedInputs.forEach((el) => {
                  const inp = el as HTMLElement & { dataset?: DOMStringMap };
                  if (inp.dataset?.wheelPatched === 'true') return;
                  el.addEventListener(
                    'wheel',
                    (event: Event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    },
                    { passive: false }
                  );
                  if (inp.dataset) {
                    inp.dataset.wheelPatched = 'true';
                  }
                });

              });
            }
          }
        });
        observer.observe(htmlEl, { childList: true, subtree: true });
        this.wheelObservers.push(observer);
        if (htmlEl.dataset) {
          htmlEl.dataset.wheelObserverAttached = 'true';
        }
      }
    });
  }
}
