import { NgClass } from '@angular/common';
import { Component, OnChanges, inject, OnDestroy, OnInit, signal, effect, ViewChild, ViewEncapsulation, Output, EventEmitter, AfterViewInit, ChangeDetectorRef, Renderer2, ViewContainerRef, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AxiomaimDrawerComponent } from '@axiomaim/components/drawer';
import {
    AxiomaimConfigService,
} from '@axiomaim/services/config';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { AlertMessagesComponent } from 'app/layout/common/alert-messages/alert-messages.component';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { AlertMessagesService } from 'app/layout/common/alert-messages/alert-messages.service';
import { AddressLookupComponent } from 'app/layout/common/address-lookup/address-lookup.component';
import { User } from 'app/modules/axiomaim/administration/users/users.model';
import { ModulesV2Service } from '../modules-v2.service';
import { Module, ModuleModel } from '../modules.model';
import { Overlay } from '@angular/cdk/overlay';

@Component({
    selector: 'modules-add-item',
    templateUrl: './add-item.component.html',
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
        MatIconModule,
        MatRippleModule,
        MatTooltipModule,
        AxiomaimDrawerComponent,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatTooltipModule,
        AlertMessagesComponent,
        MatCheckboxModule,
        MatDatepickerModule,
        TextFieldModule,
        MatSlideToggleModule,
        MatChipsModule,
        MatSidenavModule,
        GridAllModule,
        AddressLookupComponent,
        RouterLink,
        NgClass,
    ]
})
export class ModulesAddItemComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    // @Input() module: Module;
    @Input() btnIcon: string = 'mat_outline:add';
    @Input() btnTitle: string = 'Add Module';
    @Input() external: boolean = false;
    @Output() moduleCreated: EventEmitter<Module> = new EventEmitter<Module>();
    loginUser = inject(FirebaseAuthV2Service).loginUser();
    _alertMessagesService = inject(AlertMessagesService);
    _modulesV2Service = inject(ModulesV2Service);

    formFieldHelpers: string[] = [''];
    fixedSubscriptInput: FormControl = new FormControl('', [
        Validators.required,
    ]);
    dynamicSubscriptInput: FormControl = new FormControl('', [
        Validators.required,
    ]);
    fixedSubscriptInputWithHint: FormControl = new FormControl('', [
        Validators.required,
    ]);
    dynamicSubscriptInputWithHint: FormControl = new FormControl('', [
        Validators.required,
    ]);


    @ViewChild('newItemDrawer') newItemDrawer: AxiomaimDrawerComponent;
    @Output() drawerStateChanged = new EventEmitter<boolean>();

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    moduleForm: UntypedFormGroup;
    #loginUser = signal<User | null>(null);
    showRole: string[] = ["admin"];
    user_roles: any[] = [];
    reLoad: boolean = true;
    sitePermission: boolean = false;
    complinePermission: boolean = false;
    specializePermission: boolean = false;
    isSiteMultiple: boolean = false;
    user_delegation_roles: any[] = [];
    sitesDropDownData: any[] = [];
    site_account_id: any[] = [];
    isLoading = signal<boolean>(false);
    public newModule: Module = ModuleModel.emptyDto();

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _axiomaimConfigService: AxiomaimConfigService,
        private _changeDetectorRef: ChangeDetectorRef,

        private _activatedRoute: ActivatedRoute,
        private _renderer2: Renderer2,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef

        
    ) {
        console.log('#loginUser', this.#loginUser());

        // Create the basic form structure early
        this.moduleForm = this._formBuilder.group({
            name: ["", [Validators.required]],
            description: ["", [Validators.required]],
        });

        // Effect to watch for changes in the service signal
        effect(() => {
            const module = this._modulesV2Service.module();
            const data = module || ModuleModel.emptyDto();
            this.newModule = data;
            this.updateFormData(data);
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Functions
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit() {
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

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    ngOnChanges(): void {        
        // Handle changes to @Input() module if needed
        this.newModule = this._modulesV2Service.module();
        this.updateFormData(this.newModule);
    }


    /**
     * Update form data without recreating the form
     */
    updateFormData(data: Module): void {
        // Patch simple values
        this.moduleForm.patchValue({
            name: data.name || '',
            description: data.description || '',
        });

    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    
    openDrawer(): void {
        // Reset form to ensure clean state when opening
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
        
        // Reset additional form-related properties
        this.resetAdditionalProperties();
        
        // Close the drawer
        this.newItemDrawer.close();
    }

    /**
     * Comprehensive form reset method
     */
    private resetForm(): void {
        // Update to empty data
        this.updateFormData(ModuleModel.emptyDto());
        
        // Clear all validation states
        this.moduleForm.markAsUntouched();
        this.moduleForm.markAsPristine();
        
        // Reset each form control individually to ensure clean state
        Object.keys(this.moduleForm.controls).forEach(key => {
            const control = this.moduleForm.get(key);
            if (control) {
                control.setErrors(null);
                control.markAsUntouched();
                control.markAsPristine();
            }
        });
        
        // Set default values for form fields that need them (if any)
        this.moduleForm.patchValue({
            active: true,
            user_roles: [],
            site_account_id: [],
            user_delegation_roles: []
        }, { emitEvent: false });
    }

    /**
     * Reset additional component properties
     */
    private resetAdditionalProperties(): void {
        // Reset component-specific properties
        this.user_roles = [];
        this.site_account_id = [];
        this.user_delegation_roles = [];
        this.reLoad = true;
        this.sitePermission = false;
        this.complinePermission = false;
        this.specializePermission = false;
        this.isSiteMultiple = false;
    }




    /**
     * Submit and create User
     * Sned email to new user to set up their password
     * refreshes all users in service
     * closes the drawer 
     */

    async onSubmit() {
        console.log('onSubmit');
        let date: any = new Date().toISOString();

        this.newModule.orgId = this.loginUser.orgId;
        this.newModule.name = this.moduleForm.get('name').value
        this.newModule.description = this.moduleForm.get('description').value
        if(this._modulesV2Service.module() === null){
            await this._modulesV2Service.createItem(this.newModule);
            await this._modulesV2Service.getAll();
            this.sendModule();
        } else {
            await this._modulesV2Service.updateItem(this.newModule);
            await this._modulesV2Service.getAll();
            this.sendModule();
            this.external ? null : this._router.navigate(['/crm/modules']);
        }
        
        // this.isLoading.set(true);
    }
              
    sendModule() {
        this.moduleCreated.emit(this.newModule);
        this.close();
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