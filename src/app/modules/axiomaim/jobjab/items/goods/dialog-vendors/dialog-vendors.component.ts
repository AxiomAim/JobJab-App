import { Component, EventEmitter, inject, OnInit, Output, ViewEncapsulation } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { BrandsV2Service } from 'app/core/services/data-services/brands/brands-v2.service';
import { Brand, BrandModel } from 'app/core/services/data-services/brands/brands.model';
import { VendorsV2Service } from 'app/core/services/data-services/vendors/vendors-v2.service';
import { Vendor, VendorModel } from 'app/core/services/data-services/vendors/vendors.model';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
    selector: 'dialog-vendors',
    templateUrl: './dialog-vendors.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        QuillEditorComponent,
    ],
})
export class DialogVendorsComponent implements OnInit {
    loginUser = inject(FirebaseAuthV2Service).loginUser();
    _vendorsV2Service = inject(VendorsV2Service);
    // @Output() brandCreated: EventEmitter<Brand> = new EventEmitter<Brand>();
    vendorForm: UntypedFormGroup;
    newVendor: Vendor = VendorModel.emptyDto();
    quillModules: any = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
        ],
    };

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<DialogVendorsComponent>,
        private _formBuilder: UntypedFormBuilder
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.vendorForm = this._formBuilder.group({
            name: ['', [Validators.required]],
            slug: [''],
            notes: [''],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Cancel
     */
    cancel(): void {
        this.matDialogRef.close();
    }

    /**
     * onSubmit
     */
    async onSubmit() {
        if (this.vendorForm.valid) {
            this.newVendor.orgId = this.loginUser.orgId;
            this.newVendor.name = this.vendorForm.get('name').value
            this.newVendor.slug = this.vendorForm.get('slug').value
            this.newVendor.notes = this.vendorForm.get('notes').value
            await this._vendorsV2Service.createItem(this.newVendor);
            await this._vendorsV2Service.getAll();
            this.matDialogRef.close(this.vendorForm.value);
        }
    }

    sendContact() {
        // this.brandCreated.emit(this.newBrand);
        this.matDialogRef.close(this.vendorForm.value);
    }

}
