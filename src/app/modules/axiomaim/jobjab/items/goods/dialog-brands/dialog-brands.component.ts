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
import { QuillEditorComponent } from 'ngx-quill';

@Component({
    selector: 'dialog-brands',
    templateUrl: './dialog-brands.component.html',
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
export class DialogBrandsComponent implements OnInit {
    loginUser = inject(FirebaseAuthV2Service).loginUser();
    _brandsV2Service = inject(BrandsV2Service);
    // @Output() brandCreated: EventEmitter<Brand> = new EventEmitter<Brand>();
    brandForm: UntypedFormGroup;
    newBrand: Brand = BrandModel.emptyDto();
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
        public matDialogRef: MatDialogRef<DialogBrandsComponent>,
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
        this.brandForm = this._formBuilder.group({
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
        if (this.brandForm.valid) {
            this.newBrand.orgId = this.loginUser.orgId;
            this.newBrand.name = this.brandForm.get('name').value
            this.newBrand.slug = this.brandForm.get('slug').value
            this.newBrand.notes = this.brandForm.get('notes').value
            await this._brandsV2Service.createItem(this.newBrand);
            await this._brandsV2Service.getAll();
            this.matDialogRef.close(this.brandForm.value);
        }
    }

    sendContact() {
        // this.brandCreated.emit(this.newBrand);
        this.matDialogRef.close(this.brandForm.value);
    }

}
