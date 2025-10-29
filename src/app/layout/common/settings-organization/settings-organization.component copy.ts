import { TextFieldModule } from '@angular/cdk/text-field';
import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    signal,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { AxiomaimDrawerComponent } from '@axiomaim/components/drawer';
import {
    AxiomaimNavigationService,
    AxiomaimVerticalNavigationComponent,
} from '@axiomaim/components/navigation';
import { AvailableLangs, TranslocoService } from '@jsverse/transloco';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { OrganizationsV2Service } from 'app/modules/axiomaim/administration/organizations/organizations-v2.service';
import { Organization, OrganizationModel } from 'app/modules/axiomaim/administration/organizations/organizations.model';
import { take } from 'rxjs';
import { AddressLookupComponent } from '../address-lookup/address-lookup.component';
import { AlertMessagesComponent } from '../alert-messages/alert-messages.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'settings-organization',
    templateUrl: './settings-organization.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'add-item',
    imports: [
        MatButtonModule, 
        MatMenuModule, 
        MatIconModule,
        MatTooltipModule,
        MatRippleModule,
        AxiomaimDrawerComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        AlertMessagesComponent,
        TextFieldModule,
        AddressLookupComponent,
        MatDividerModule,
    ],
})
export class SettingsOrganizationComponent implements OnInit, OnDestroy {
    @Input() btnIcon: string = 'mat_outline:add';
    @Input() btnTitle: string = 'Organization Settings';
    @Input() external: boolean = false;
    @Output() jobCreated: EventEmitter<Organization> = new EventEmitter<Organization>();

    loginUser = inject(FirebaseAuthV2Service).loginUser();
    @ViewChild('newItemDrawer') newItemDrawer: AxiomaimDrawerComponent;
    @Output() drawerStateChanged = new EventEmitter<boolean>();
    _organizationsV2Service = inject(OrganizationsV2Service);
    organizationForm: UntypedFormGroup;
    availableLangs: AvailableLangs;
    activeLang: string;
    flagCodes: any;
    isLoading = signal<boolean>(false);

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _axiomaimNavigationService: AxiomaimNavigationService,
        private _translocoService: TranslocoService,
        private _formBuilder: UntypedFormBuilder
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit() {
        // Create the form
        this.organizationForm = this._formBuilder.group({
            name: ['', Validators.required],
            description: [''],
            domain: [''],
            address: [''],
            phone: [''],
            email: [''],
            contact: [''],
            logo: [''],
            facebook: [''],
            x: [''],
            linkedIn: [''],
            google: [''],
            instagram: [''],
        });
        await this._organizationsV2Service.getItem(this.loginUser.organization.id)

        await this.organizationForm.patchValue(this._organizationsV2Service.organization());
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

        /**
     * Submit and create User
     * Sned email to new user to set up their password
     * refreshes all users in service
     * closes the drawer 
     */

    async onSubmit() {
        this.isLoading.set(true);
        const editOrganization: Organization = this._organizationsV2Service.organization();
        try {
            editOrganization.name = this.organizationForm.get('name').value;
            editOrganization.description = this.organizationForm.get('description').value;
            editOrganization.domain = this.organizationForm.get('domain').value;
            editOrganization.address = this.organizationForm.get('address').value;
            editOrganization.phone = this.organizationForm.get('phone').value;
            editOrganization.email = this.organizationForm.get('email').value;
            editOrganization.contact = this.organizationForm.get('contact').value;
            editOrganization.logo = this.organizationForm.get('logo').value;
            editOrganization.facebook = this.organizationForm.get('facebook').value;
            editOrganization.x = this.organizationForm.get('x').value;
            editOrganization.linkedIn = this.organizationForm.get('linkedIn').value;
            editOrganization.google = this.organizationForm.get('google').value;
            editOrganization.instagram = this.organizationForm.get('instagram').value;

            await this._organizationsV2Service.updateItem(editOrganization);
            await this._organizationsV2Service.getAll();

        } finally {
            this.isLoading.set(false);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    setCustomer(event: any) {
        // this.customer = event;
        console.log('Customer created event received in QuoteComponent:', event);
    }

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
            this.updateFormData(OrganizationModel.emptyDto());
            
            // Clear all validation states
            this.organizationForm.markAsUntouched();
            this.organizationForm.markAsPristine();
            
            // Reset each form control individually to ensure clean state
            Object.keys(this.organizationForm.controls).forEach(key => {
                const control = this.organizationForm.get(key);
                if (control) {
                    control.setErrors(null);
                    control.markAsUntouched();
                    control.markAsPristine();
                }
            });
        }
    
    /**
     * Update form data without recreating the form
     */
    updateFormData(data: Organization): void {
        // Patch simple values
        this.organizationForm.patchValue({
            // firstName: data.firstName || '',
            // lastName: data.lastName || '',
            // company: data.company || '',
            // source: data.source || null,  // Added
            // Removed address/lead (handled separately)
        });

    }


}
