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
import { User, UserModel } from 'app/modules/axiomaim/administration/users/users.model';
import { MessagesV2Service } from '../messages-v2.service';
import { Message, MessageModel } from '../messages.model';
import { Overlay } from '@angular/cdk/overlay';
import { SelectUserComponent } from 'app/layout/common/select-user/select-user.component';

@Component({
    selector: 'messages-add-item',
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
        SelectUserComponent
    ]
})
export class MessagesAddItemComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    // @Input() message: Message;
    @Input() btnIcon: string = 'mat_outline:add';
    @Input() btnTitle: string = 'Add Message';
    @Output() messageCreated: EventEmitter<Message> = new EventEmitter<Message>();
    loginUser = inject(FirebaseAuthV2Service).loginUser();
    _alertMessagesService = inject(AlertMessagesService);
    _messagesV2Service = inject(MessagesV2Service);

    @ViewChild('newItemDrawer') newItemDrawer: AxiomaimDrawerComponent;
    @Output() drawerStateChanged = new EventEmitter<boolean>();

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    messageForm: UntypedFormGroup;
    thisUser: User = UserModel.emptyDto();
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
    public newMessage: Message = MessageModel.emptyDto();

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
        this.messageForm = this._formBuilder.group({
            firstName: ["", [Validators.required]],
            lastName: ["", [Validators.required]],
            company: ["", [Validators.required]],
            address: ["", [Validators.required]],
            lead: [false, [Validators.required]],
            leadAt: [''],
            customer: [false, [Validators.required]],
            customerAt: [''],
            emails: this._formBuilder.array([]),
            phoneNumbers: this._formBuilder.array([]),
        });

        // Effect to watch for changes in the service signal
        effect(() => {
            const message = this._messagesV2Service.message();
            console.log('Signal message changed', message);
            const data = message || MessageModel.emptyDto();
            console.log('Signal data', data);
            this.newMessage = data;
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
        console.log('Signal message (ngOnInit)', this._messagesV2Service.message());
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
        // Handle changes to @Input() message if needed
        this.newMessage = this._messagesV2Service.message();
        this.updateFormData(this.newMessage);
    }


    /**
     * Update form data without recreating the form
     */
    updateFormData(data: Message): void {
        // Patch simple values
        this.messageForm.patchValue({
            userId: data.userId || '',
            title: data.title || '',
            description: data.description || '',
            link: data.link || '',
        });

        console.log('this.messageForm', this.messageForm);
        console.log('this.message', data);

    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    
          /**
     * Add the email field
     */
    addEmailField(): void {
        // Create an empty email form group
        const emailFormGroup = this._formBuilder.group({
            email: [''],
            label: [''],
        });

        // Add the email form group to the emails form array
        (this.messageForm.get('emails') as UntypedFormArray).push(
            emailFormGroup
        );

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove the email field
     *
     * @param index
     */
    removeEmailField(index: number): void {
        // Get form array for emails
        const emailsFormArray = this.messageForm.get(
            'emails'
        ) as UntypedFormArray;

        // Remove the email field
        emailsFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Add an empty phone number field
     */
    addPhoneNumberField(): void {
        // Create an empty phone number form group
        const phoneNumberFormGroup = this._formBuilder.group({
            country: ['us'],
            phoneNumber: [''],
            label: [''],
        });

        // Add the phone number form group to the phoneNumbers form array
        (this.messageForm.get('phoneNumbers') as UntypedFormArray).push(
            phoneNumberFormGroup
        );

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove the phone number field
     *
     * @param index
     */
    removePhoneNumberField(index: number): void {
        // Get form array for phone numbers
        const phoneNumbersFormArray = this.messageForm.get(
            'phoneNumbers'
        ) as UntypedFormArray;

        // Remove the phone number field
        phoneNumbersFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }


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
        this.updateFormData(MessageModel.emptyDto());
        
        // Clear all validation states
        this.messageForm.markAsUntouched();
        this.messageForm.markAsPristine();
        
        // Reset each form control individually to ensure clean state
        Object.keys(this.messageForm.controls).forEach(key => {
            const control = this.messageForm.get(key);
            if (control) {
                control.setErrors(null);
                control.markAsUntouched();
                control.markAsPristine();
            }
        });
        
        // Set default values for form fields that need them (if any)
        this.messageForm.patchValue({
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


    onUserSelected(event: any) {
        this.thisUser = event;
        console.log('User selected:', event);
        console.log('this.thisUser:', this.thisUser);
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

        this.newMessage.orgId = this.loginUser.orgId;
        this.newMessage.userId = this.messageForm.get('userId').value
        this.newMessage.title = this.messageForm.get('title').value
        this.newMessage.description = this.messageForm.get('description').value
        this.newMessage.link = this.messageForm.get('link').value
        await this._messagesV2Service.createItem(this.newMessage);
        
        // this.isLoading.set(true);
    }
              

    sendMessage() {
        this.messageCreated.emit(this.newMessage);
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