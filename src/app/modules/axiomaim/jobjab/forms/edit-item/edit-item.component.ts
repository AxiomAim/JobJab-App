import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit, signal, effect, ViewChild, ViewEncapsulation, Output, EventEmitter, AfterViewInit, ChangeDetectorRef, Input, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AxiomaimDrawerComponent } from '@axiomaim/components/drawer';
import {
    AxiomaimConfigService,
} from '@axiomaim/services/config';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDrawerToggleResult, MatSidenavModule } from '@angular/material/sidenav';
import { AlertMessagesComponent } from 'app/layout/common/alert-messages/alert-messages.component';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { AlertMessagesService } from 'app/layout/common/alert-messages/alert-messages.service';
import { Form, FormModel } from '../forms.model';
import { FormsV2Service } from '../forms-v2.service';
import { v4 as uuidv4 } from 'uuid';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage'; // Import getDownloadURL
import { AxiomaimLoadingService } from '@axiomaim/services/loading';
import { SurveyCreatorModel } from 'survey-creator-core';
import { SurveyCreatorModule } from 'survey-creator-angular';
import { FormsListComponent } from '../list/list.component';

const surveyJson = {
  elements: [
    {
      type: "address-lookup",
      name: "address",
      title: "Enter your address",
      placeholder: "Search for an address"
    }
  ]
};

const creatorOptions = {
  autoSaveEnabled: false,
  collapseOnDrag: true
};


@Component({
    selector: 'forms-edit-item',
    styleUrls: ['./edit-item.component.scss'],
    templateUrl: './edit-item.component.html',
    styles: [
        `
            settings {
                position: static;
                display: block;
                flex: none;
                width: auto;
            }

            @media (screen and min-width: 1280px) {
                empty-layout + settings .settings-cog {
                    right: 0 !important;
                }
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        RouterLink,
        MatIconModule,
        MatRippleModule,
        MatTooltipModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatDatepickerModule,
        TextFieldModule,
        MatSlideToggleModule,
        MatChipsModule,
        MatSidenavModule,
        SurveyCreatorModule,
    ]
})
export class FormsEditItemComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() btnIcon: string = 'mat_outline:add';
    @Input() btnTitle: string = 'Add';
    @Input() external: boolean = false;
    @Output() formCreated: EventEmitter<Form> = new EventEmitter<Form>();
    public _formsV2Service = inject(FormsV2Service);
    @Input() bucket: string = 'forms';
    surveyCreatorModel: SurveyCreatorModel;
    newForm: Form = FormModel.emptyDto();
    _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
    today = signal<string>(new Date().toISOString());
    isLoading = signal<boolean>(false);
    title = '';
    loginUser = inject(FirebaseAuthV2Service).loginUser();
    public _alertMessagesService = inject(AlertMessagesService);

    @ViewChild('newItemDrawer') newItemDrawer: AxiomaimDrawerComponent;
    @Output() drawerStateChanged = new EventEmitter<boolean>();

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    itemForm: FormGroup;  // Typed for safety
    public address = new FormControl('');  // Standalone, but tied via formControlName in HTML
    
    lead: boolean = false;
    leadAt: string = null;
    customer: boolean = false;
    customerAt: string = null;
    cancel: boolean = false;
    cancelAt: string = null;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _axiomaimConfigService: AxiomaimConfigService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _activatedRoute: ActivatedRoute,
        @Inject(Storage) private readonly storage: Storage,
        private _axiomaimLoadingService: AxiomaimLoadingService,
        private _formsListComponent: FormsListComponent,

    ) {
        // Create the basic form structure early (typed)
        this.itemForm = this._formBuilder.group({
            name: ['', [Validators.required]],
        });

        // Effect to watch for changes in the service signal
        effect(() => {
            const form = this._formsV2Service.form();
            const data = form || FormModel.emptyDto();
            this.newForm = data;
            this.updateFormData(data);
            this._changeDetectorRef.detectChanges();  // Force detection after effect to avoid NG0100
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Functions
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit() {
    this.newForm = this._formsV2Service.form();
    this._formsListComponent.matDrawer.open();

    console.log('edit-item - newForm', this.newForm);
      const creator = new SurveyCreatorModel(creatorOptions, surveyJson);
      creator.JSON = surveyJson;
      creator.text = JSON.stringify(this.newForm.formJson);
      creator.saveSurveyFunc = (saveNo: number, callback: Function) => { 
      callback(saveNo, true);
      const formJson = JSON.parse(creator.text);
      this.newForm.name = formJson.title || 'Untitled Form';
      this.newForm.formJson = formJson;
      this._formsV2Service.createItem(this.newForm);
      this.close();
        // creator.onUploadFile.add((_, options) => {
        //   const formData = new FormData();
        //   options.files.forEach((file: File) => {
        //     formData.append(file.name, file);
        //   });
        //   fetch("https://example.com/uploadFiles", {
        //     method: "post",
        //     body: formData
        //   }).then(response => response.json())
        //     .then(result => {
        //       options.callback(
        //         "success",
        //         // A link to the uploaded file
        //         "https://example.com/files?name=" + result[options.files[0].name]
        //       );
        //     })
        //     .catch(error => {
        //       options.callback('error');
        //     });
        // });
      };
      this.surveyCreatorModel = creator;
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        // Subscribe to drawer state changes and emit to parent
        // This needs to be in ngAfterViewInit because ViewChild is not available in ngOnInit
        this.newItemDrawer.openedChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((opened: boolean) => {
                this.drawerStateChanged.emit(opened);
            });
    }

    setupForm() {
        this.newForm = FormModel.emptyDto();
        console.log('setupForm - newForm', this.newForm);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Update form data without recreating the form
     */
    updateFormData(data: Form): void {
        // Patch simple values
        this.itemForm.patchValue({
            name: data.name || '',
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    
    openDrawer(): void {
        // Reset form to ensure clean state when opening
        console.log('openDrawer - resetting form');
        this.resetForm();
        
        // Open the drawer
        this.newItemDrawer.open();
    }

    /**
     * Close Drawer (does not save form data) 
     */
    close(): void {
        // Comprehensive form reset to prevent validation errors on reopen
        this.resetForm();
        
        // Close the drawer
        this.newItemDrawer.close();
    }

    /**
     * Comprehensive form reset method
     */
    private resetForm(): void {
        // Update to empty data
        this.updateFormData(FormModel.emptyDto());
        
        // Clear all validation states
        this.itemForm.markAsUntouched();
        this.itemForm.markAsPristine();
        
        // Reset each form control individually to ensure clean state
        Object.keys(this.itemForm.controls).forEach(key => {
            const control = this.itemForm.get(key);
            if (control) {
                control.setErrors(null);
                control.markAsUntouched();
                control.markAsPristine();
            }
        });
    }

    /**
     * Submit and create User
     * Sned email to new user to set up their password
     * refreshes all users in service
     * closes the drawer 
     */

    async onSubmit() {
        this.isLoading.set(true);
        try {
            let date: any = new Date().toISOString();

            this.newForm.orgId = this.loginUser.orgId;
            this.newForm.name = this.itemForm.get('name').value
            await this._formsV2Service.createItem(this.newForm);
            await this._formsV2Service.getAll();
                    
            if(this.external){
                this.sendForm();
                this.close();
            } else {
                this.close();
                // this._router.navigate(['/crm/forms']);
            }
        } finally {
            this.isLoading.set(false);
        }
    }
              
    sendForm() {
        this.formCreated.emit(this.newForm);
        this.close();
    }

    setAtDate(control: string) {
        switch(control) {
            case 'lead':
                if(this.lead === true){
                    this.leadAt = new Date().toISOString();
                } else {
                    this.leadAt = null;
                }
                break;
            case 'customer':
                if(this.customer === true){
                    this.customerAt = new Date().toISOString();
                } else {
                    this.customerAt = null;
                }
                break;
            case 'cancel':
                if(this.cancel === true){
                    this.cancelAt = new Date().toISOString();
                } else {
                    this.cancelAt = null;
                }
                break;

        }
    }

    uploadFile(event: any) {
        this._axiomaimLoadingService.show();
        const file = event.target.files[0];
        
        const fileName = ref(this.storage, `${uuidv4().toString()}_${file.name}`);
        const storageRef = ref(this.storage, `${this.bucket}/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.then((snapshot) => { // Use then() for completion
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                const asset = {
                    fileName: fileName,
                    fileType: file.type,
                    filePath: storageRef.fullPath,
                    fileUrl: downloadURL,
                    // ... other properties you need ...
                };
                console.log('asset', asset)
                this._axiomaimLoadingService.hide();
                // this.setFile.emit(asset);
            }).catch((error) => {
                console.error("Error getting download URL:", error);
                this._axiomaimLoadingService.hide();
                // Handle the error
            });
        }).catch((error) => {
            console.error("Upload error:", error);
            this._axiomaimLoadingService.hide();
            // Handle the error
        });
    }
    
    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._formsListComponent.matDrawer.close();
    }


    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
    
}