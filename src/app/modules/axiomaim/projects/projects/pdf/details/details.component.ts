import { Component, ElementRef, inject, OnInit, Renderer2, TemplateRef, ViewChild, ViewEncapsulation, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { TextFieldModule } from '@angular/cdk/text-field';
import { User } from 'app/modules/davesa/administration/users/user.model';
import { Organization } from 'app/modules/davesa/administration/organizations/organizations.model';
import { ProjectsV2Service } from '../../ProjectsV2.service';
import {PdfViewerComponent, LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService,
    ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService, 
    FormDesignerService, LoadEventArgs, FormFieldsService, TextFieldSettings, SignatureFieldSettings, InitialFieldSettings, 
    CheckBoxFieldSettings, RadioButtonFieldSettings, 
    PdfViewerModule,
    FreeTextSettings,
    ListBoxFieldSettings,
    RectangleSettings,
    CircleSettings,
    PolygonSettings,
    ArrowSettings,
    LineSettings,
    HandWrittenSignatureSettings,
    DisplayMode,  
    AnnotationResizerLocation,
    CursorType,
    CustomToolbarItemModel
  } from '@syncfusion/ej2-angular-pdfviewer';
import { ProjectBoard } from '../../project-board.model';
import { ProjectList } from '../../project-list.model';
import { ProjectCard } from '../../project-card.model';
import { Router, RouterLink } from '@angular/router';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { HttpClient } from '@angular/common/http';
import { ClickEventArgs } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'projects-pdf-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatRippleModule,
        MatCheckboxModule,
        MatSelectModule,
        MatOptionModule,
        TextFieldModule,
        PdfViewerModule,
        SidebarModule
        // PdfDocViewerComponent
    ],
    providers: [
        LinkAnnotationService, 
        BookmarkViewService, 
        MagnificationService, 
        ThumbnailViewService, 
        ToolbarService,
        NavigationService, 
        TextSearchService, 
        TextSelectionService, 
        PrintService, 
        AnnotationService, 
        FormDesignerService, 
        FormFieldsService,
        PrintService
    ]
})
export class ProjectsPdfDetailsComponent implements OnInit {
    _projectsV2Service = inject(ProjectsV2Service);
    _router = inject(Router);
    loginUser: User;
    organization: Organization;
    projectBoard: ProjectBoard;
    projectLists: ProjectList[] = [];
    projectCards: ProjectCard[] = [];
    mergedLists: any[];

    public attachedDocuments: { name: string, base64: string, type: string  }[] = [];
    public uploadedFiles: { name: string }[] = [];
    public dropdownOpen: boolean[] = [];

     
    @ViewChild('pdfviewer')
    public pdfviewerControl?: PdfViewerComponent;
    public service: string = 'https://services.syncfusion.com/angular/production/api/pdfviewer';
    public document: string = 'https://cdn.syncfusion.com/content/pdf/form-designer.pdf';
    public documentPath: string;;
  
    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<ProjectsPdfDetailsComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private http: HttpClient

    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    // documentLoaded(e: LoadEventArgs): void {

    //     var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
    //       viewer.formDesignerModule.addFormField("Textbox", {name: 'First Name', bounds: { X: 146, Y: 229, Width: 150, Height: 24 },} as TextFieldSettings);
    //       viewer.formDesignerModule.addFormField("Textbox", { name: "Middle Name", bounds: { X: 338, Y: 229, Width: 150, Height: 24 },} as TextFieldSettings);
    //       viewer.formDesignerModule.addFormField('Textbox', {name: 'Last Name',bounds: { X: 530, Y: 229, Width: 150, Height: 24 },} as TextFieldSettings);
    //       viewer.formDesignerModule.addFormField('RadioButton', {bounds: { X: 148, Y: 289, Width: 18, Height: 18 },name: 'Gender',isSelected: false,} as RadioButtonFieldSettings);
    //       viewer.formDesignerModule.addFormField('RadioButton', {bounds: { X: 292, Y: 289, Width: 18, Height: 18 },name: 'Gender',isSelected: false,} as RadioButtonFieldSettings);
    //       viewer.formDesignerModule.addFormField('Textbox', {name: 'DOB Month',bounds: { X: 146, Y: 320, Width: 35, Height: 24 },} as TextFieldSettings);
    //       viewer.formDesignerModule.addFormField('Textbox', {name: 'DOB Date',bounds: { X: 193, Y: 320, Width: 35, Height: 24 },} as TextFieldSettings);
    //       viewer.formDesignerModule.addFormField('Textbox', {name: 'DOB Year',bounds: { X: 242, Y: 320, Width: 35, Height: 24 },} as TextFieldSettings);
    //       viewer.formDesignerModule.addFormField('InitialField', {name: 'Agree',bounds: { X: 148, Y: 408, Width: 200, Height: 43 },} as InitialFieldSettings);
    //       viewer.formDesignerModule.addFormField('InitialField', {name: 'Do Not Agree',bounds: { X: 148, Y: 466, Width: 200, Height: 43 },} as InitialFieldSettings);
    //       viewer.formDesignerModule.addFormField('CheckBox', {name: 'Text Message',bounds: { X: 56, Y: 664, Width: 20, Height: 20 },isChecked: false,} as CheckBoxFieldSettings);
    //       viewer.formDesignerModule.addFormField('CheckBox', {name: 'Email',bounds: { X: 242, Y: 664, Width: 20, Height: 20 },isChecked: false,} as CheckBoxFieldSettings);
    //       viewer.formDesignerModule.addFormField('CheckBox', {name: 'Appointment Reminder',bounds: { X: 56, Y: 740, Width: 20, Height: 20 },isChecked: false,} as CheckBoxFieldSettings);
    //       viewer.formDesignerModule.addFormField('CheckBox', {name: 'Request for Customerservice',bounds: { X: 56, Y: 778, Width: 20, Height: 20 },isChecked: false,} as CheckBoxFieldSettings);
    //       viewer.formDesignerModule.addFormField('CheckBox', {name: 'Information Billing',bounds: { X: 290, Y: 740, Width: 20, Height: 20 },isChecked: false,} as CheckBoxFieldSettings);
    //       viewer.formDesignerModule.addFormField('Textbox', {name: 'My Email',bounds: { X: 146, Y: 850, Width: 200, Height: 24 },} as TextFieldSettings);
    //       viewer.formDesignerModule.addFormField('Textbox', {name: 'My Phone',bounds: { X: 482, Y: 850, Width: 200, Height: 24 },} as TextFieldSettings);
    //       viewer.formDesignerModule.addFormField('SignatureField', {name: 'Sign',bounds: { X: 57, Y: 923, Width: 200, Height: 43 },} as SignatureFieldSettings);
    //       viewer.formDesignerModule.addFormField('Textbox', {name: 'DOS Month',bounds: { X: 386, Y: 923, Width: 35, Height: 24 },} as TextFieldSettings);
    //       viewer.formDesignerModule.addFormField('Textbox', {name: 'DOS Date',bounds: { X: 434, Y: 923, Width: 35, Height: 24 },} as TextFieldSettings);
    //       viewer.formDesignerModule.addFormField('Textbox', {name: 'DOS Year',bounds: { X: 482, Y: 923, Width: 35, Height: 24 },} as TextFieldSettings);
    //       viewer.formDesignerModule.updateFormField(this.pdfviewerControl?.formFieldCollections[0], { backgroundColor: 'red' } as TextFieldSettings);
    //     }

        public isInitialLoading: boolean = true;
        public exportedData:any;
        exportObject: any;

        OnExportJson() {
          var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
          viewer.exportAnnotationsAsObject().then( (value: any) => {
            this.exportObject = value;
          });
          console.log(this.exportedData);
        }
        public documentLoad(e: LoadEventArgs): void {
          if(this.isInitialLoading){
            var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
            viewer.annotationModule.setAnnotationMode('HandWrittenSignature');
            this.isInitialLoading = false;
          }
      }
        OnImportJson() {
          var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
          viewer.importAnnotation(JSON.parse(this.exportObject));
        }
    /**
     * On init
     */ 
    ngOnInit(): void {
        this.loginUser = this._projectsV2Service.loginUser();
        this.organization = this._projectsV2Service.organization();

        this.projectBoard = this._projectsV2Service.projectBoard();
        this.projectLists = this._projectsV2Service.projectLists();
        this.projectCards = this._projectsV2Service.projectCards();
        this.mergedLists = this.projectLists.map(list => {
            return {
              ...list,
              cards: this.projectCards.filter(card => card.listId === list.id)
            };
          });
        // this.myBoard = { ...this.projectBoard, lists: mergedLists };
        this._changeDetectorRef.markForCheck();
        this.documentPath = this.projectBoard.fileUrl;
        console.log('projectBoard', this.projectBoard)
        document.addEventListener('click', this.handleClickOutside.bind(this));
            
    }


    ngOnDestroy() {
      document.removeEventListener('click', this.handleClickOutside.bind(this));
    }


  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-btn') && !target.closest('.dropdown-content')) {
      this.dropdownOpen = this.dropdownOpen.map(() => false);
    }
  }
  public attachPdf: CustomToolbarItemModel = {
    prefixIcon: 'e-icons e-link',
    id: 'attach_pdf',
    align: 'Right',
    text: 'Attach PDF',
    tooltipText: 'Attach PDF file',
  };


  private browseFile(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.uploadedFiles.push({ name: file.name });
        this.dropdownOpen.push(false);
        const reader = new FileReader();
        reader.onload = (args: any) => {
          var base64String = args.target.result.split('base64,')[1];
          this.attachedDocuments.push({ name: file.name, base64: base64String, type: file.type });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  deleteFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
    this.attachedDocuments.splice(index, 1);
    this.dropdownOpen.splice(index, 1);
  }
  
  public toolbarClick(args: any): void {
    if (args.item && args.item.id === 'attach_pdf') {
      this.browseFile();
    } else if (args.item && args.item.id === 'download') {
      this.processDocuments();
    }
  }
  
    processDocuments(): void {
      var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
      viewer.saveAsBlob().then((value: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          const uint8Array = new Uint8Array(reader.result as ArrayBuffer);
          let binary = '';
          uint8Array.forEach((byte) => (binary += String.fromCharCode(byte)));
          const base64String = window.btoa(binary);
          const requestBody = {
            attachedDocuments: this.attachedDocuments,
            PrimaryDocument: base64String
          };
      
          this.http.post('https://localhost:7237/pdfviewer/AttachSavePdf', requestBody)
            .subscribe((response: any) => {
              const mergedDocumentBase64 = response.attachedPDF;
              this.downloadBase64File(mergedDocumentBase64, 'merged_document.pdf');
            }, error => {
              console.error('Error processing documents', error);
            });
        };
        reader.readAsArrayBuffer(value);
      });
    }
    
    downloadBase64File(base64Data: string, fileName: string): void {
      const linkSource = `data:application/pdf;base64,${base64Data}`;
      const downloadLink = document.createElement('a');
  
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }
    public download: CustomToolbarItemModel = {
      prefixIcon: 'e-pv-download-document-icon',
      id: 'download',
      align: 'Right',
      tooltipText: 'Download file',
    };
  
    public documentLoaded(e: LoadEventArgs): void {
      var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
      viewer.saveAsBlob().then((value: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          const uint8Array = new Uint8Array(reader.result as ArrayBuffer);
          let binary = '';
          uint8Array.forEach((byte) => (binary += String.fromCharCode(byte)));
          const base64String = window.btoa(binary);
          const requestBody = {
            attachedDocuments: this.attachedDocuments,
            PrimaryDocument: base64String
          };
      
          this.http.post('https://localhost:7237/pdfviewer/LoadedPdf', requestBody)
            .subscribe((response: any) => {
              this.attachedDocuments = response.documentCollections;
              if(response.documentCollections.length > 0) {
                for (let i = 0; i < response.documentCollections.length; i++) {
                  this.uploadedFiles.push({
                    name: response.documentCollections[i].name
                  });
                  this.dropdownOpen.push(false);
                }
              }
            }, error => {
              console.error('Error loading document', error);
            });
        };
        reader.readAsArrayBuffer(value);
      });
    }
    
    public toolbarSettings = {
      showTooltip: true,
      toolbarItems: [this.attachPdf, 'OpenOption', 'PageNavigationTool', 'MagnificationTool', 'PanTool', 'SelectionTool', 'SearchOption', 'PrintOption', this.download, 'UndoRedoTool', 'AnnotationEditTool', 'FormDesignerEditTool', 'CommentTool', 'SubmitForm']
    };

  toggleDropdown(index: number) {
    this.dropdownOpen = this.dropdownOpen.map((open, i) => i === index ? !open : false);
  }

    // addLog(){
    //     var pdfviewer = (<any>document.getElementById("pdfViewer")).ej2_instances[0];
    //     var annotationCollections = pdfviewer.annotationCollection;
    //     this.projectCards.forEach(card => {
    //         console.log(annotationCollections[x].annotationId);
    //         var comments = annotationCollections[x].comments;
    //     });
    //     for (var x = 0; x < annotationCollections.length; x++) {
    //       //Prints the annotation id in the console window.
    //       console.log(annotationCollections[x].annotationId);
    //       var comments = annotationCollections[x].comments;
    //       for (var y = 0; y < comments.length; y++) {
    //         var comment = comments[y];
    //         //Prints the PDF document's comments in the console window.
    //         console.log("comment" + "[" + y + "] :" + comment.note);
    //       }
    //       var note = annotationCollections[x].note;
    //       console.log("note : " + note);
    //     }
    //   }

      // addAnnotation(pdfviewer, message) {
      //   pdfviewer.annotation.addAnnotation("FreeText", {
      //     offset: { x: 100, y: 150 },
      //     fontSize: 16,
      //     fontFamily: "Helvetica",
      //     pageNumber: 1,
      //     width: 200,
      //     height: 40,
      //     isLock: false,
      //     textAlignment : 'Center',
      //     borderStyle : 'solid',
      //     borderWidth : 2,
      //     borderColor : 'red',
      //     fillColor : 'blue',
      //     fontColor: 'white',
      //     defaultText: "Syncfusion"
      //   } as FreeTextSettings);
      // }

      close() {
        this.matDialogRef.close();
        this._router.navigate(['csv/projects/', this.projectBoard.id]);


    }

    // addAnnotation1() {
    //     var pdfviewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
    //     pdfviewer.annotation.addAnnotation("FreeText", {
    //       offset: { x: 100, y: 150 },
    //       fontSize: 16,
    //       fontFamily: "Helvetica",
    //       pageNumber: 1,
    //       width: 200,
    //       height: 40,
    //       isLock: false,
    //       textAlignment : 'Center',
    //       borderStyle : 'solid',
    //       borderWidth : 2,
    //       borderColor : 'red',
    //       fillColor : 'blue',
    //       fontColor: 'white',
    //       defaultText: "Syncfusion"
    //     } as FreeTextSettings);
    //   }


    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }



    /////Annonation Examples////////////////

    addLineAnnotation() {
      var pdfviewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
      pdfviewer.annotation.addAnnotation("Line", {
        offset: { x: 200, y: 230 },
        pageNumber: 1,
        vertexPoints: [{ x: 200, y: 230 }, { x: 350, y: 230 }]
      } as LineSettings);
    }
    addArrowAnnotation() {
      var pdfviewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
      pdfviewer.annotation.addAnnotation("Arrow", {
        offset: { x: 200, y: 370 },
        pageNumber: 1,
        vertexPoints: [{ x: 200, y: 370 }, { x: 350, y: 370 }]
      } as ArrowSettings);
    }
    addRectangleAnnotation() {
      var pdfviewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
      pdfviewer.annotation.addAnnotation("Rectangle", {
        offset: { x: 200, y: 480 },
        pageNumber: 1,
        width: 150,
        height: 75
      } as RectangleSettings);
    }
    addCircleAnnotation() {
      var pdfviewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
      pdfviewer.annotation.addAnnotation("Circle", {
        offset: { x: 200, y: 620 },
        pageNumber: 1,
        width: 90,
        height: 90
      } as CircleSettings);
    }
    addPolygonAnnotation() {
      var pdfviewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
      pdfviewer.annotation.addAnnotation("Polygon", {
        offset: { x: 200, y: 800 },
        pageNumber: 1,
        vertexPoints: [{ x: 200, y: 800 }, { x: 242, y: 771 }, { x: 289, y: 799 }, { x: 278, y: 842 }, { x: 211, y: 842 }, { x: 200, y: 800 }]
      } as PolygonSettings);
    }


    public handWritten = {
      signatureItem: ["Signature", "Initial"],
      saveSignatureLimit: 1,
      author: "Syncfusion", //This line is nessacery to consider Handwritten signature as ink annotation. This helps to Export and Import Handwritten Signature annotation.
      saveInitialLimit: 1,
      opacity: 1,
      strokeColor: "#000000",
      width: 150,
      height: 100,
      thickness: 1,
      annotationSelectorSettings: {
        selectionBorderColor: "blue",
        resizerBorderColor: "black",
        resizerFillColor: "#FF4081",
        resizerSize: 8,
        selectionBorderThickness: 1,
        resizerShape: "Circle",
        selectorLineDashArray: [5, 6],
        resizerLocation:
          AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
        resizerCursorType: CursorType.grab,
      },
      allowedInteractions: ["Resize"],
      signatureDialogSettings: {
        displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload,
        hideSaveSignature: false,
      },
      initialDialogSettings: {
        displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload,
        hideSaveSignature: false,
      },
    };



  }
