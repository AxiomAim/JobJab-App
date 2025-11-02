import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit, signal, effect, ViewChild, ViewEncapsulation, Output, EventEmitter, AfterViewInit, ChangeDetectorRef, Input, inject } from '@angular/core';
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
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AlertMessagesComponent } from 'app/layout/common/alert-messages/alert-messages.component';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { AlertMessagesService } from 'app/layout/common/alert-messages/alert-messages.service';
import { AddressLookupComponent } from 'app/layout/common/address-lookup/address-lookup.component';
import { Good, GoodModel } from 'app/core/services/data-services/goods/goods.model';
import { GoodsV2Service } from 'app/core/services/data-services/goods/goods-v2.service';
import { VendorsV2Service } from 'app/core/services/data-services/vendors/vendors-v2.service';
import { CategoriesV2Service } from 'app/core/services/data-services/cetagories/cetagories-v2.service';
import { BrandsV2Service } from 'app/core/services/data-services/brands/brands-v2.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBrandsComponent } from '../dialog-brands/dialog-brands.component';
import { GoodBrand, GoodCategory, GoodTag, GoodVendor } from '../goods.types';
import { DialogVendorsComponent } from '../dialog-vendors/dialog-vendors.component';
import { Tag, TagModel } from 'app/core/services/data-services/tags/tags.model';
import { TagsV2Service } from 'app/core/services/data-services/tags/tags-v2.service';

@Component({
    selector: 'goods-add-item',
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
    ]
})
export class GoodsAddItemComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() btnIcon: string = 'mat_outline:add';
    @Input() btnTitle: string = 'Add';
    @Input() external: boolean = false;
    @Output() goodCreated: EventEmitter<Good> = new EventEmitter<Good>();
    loginUser = inject(FirebaseAuthV2Service).loginUser();
    public _alertMessagesService = inject(AlertMessagesService);
    public _goodsV2Service = inject(GoodsV2Service);
    public _categoriesV2Service = inject(CategoriesV2Service);
    public _vendorsV2Service = inject(VendorsV2Service);
    public _brandsV2Service = inject(BrandsV2Service);
    public _tagsV2Service = inject(TagsV2Service);

    @ViewChild('newItemDrawer') newItemDrawer: AxiomaimDrawerComponent;
    @Output() drawerStateChanged = new EventEmitter<boolean>();

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    goodForm: FormGroup;  // Typed for safety
    isLoading = signal<boolean>(false);
    newGood: Good = GoodModel.emptyDto();
    
    flashMessage: 'success' | 'error' | null = null;
    tags: GoodTag[];
    tagsEditMode: boolean = false;
    vendors: GoodVendor[];
    brands: GoodBrand[];
    categories: GoodCategory[];
    filteredTags: GoodTag[];
    selectedGood: Good | null = null;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _axiomaimConfigService: AxiomaimConfigService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _activatedRoute: ActivatedRoute,
        private _matDialog: MatDialog,

    ) {
        // Create the basic form structure early (typed)
        this.goodForm = this._formBuilder.group({
            id: [''],
            category: ['', [Validators.required]],
            name: ['', [Validators.required]],
            description: [''],
            tags: [[]],
            sku: [''],
            barcode: [''],
            brand: [''],
            vendor: [''],
            stock: [''],
            reserved: [''],
            cost: [''],
            basePrice: [''],
            taxPercent: [''],
            price: [''],
            weight: [''],
            thumbnail: [''],
            images: [[]],
            currentImageIndex: [0], // Image index that is currently being viewed
            active: [false],
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Functions
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit() {
        this.goodForm.get('id').value
        // Defer async loads to avoid expression change errors
        setTimeout(async () => {

        });

        this.updateFormData(this.newGood);
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
        console.log('setupForm - newGood', this.newGood);
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
    updateFormData(data: Good): void {
        // Patch simple values
        this.goodForm.patchValue({
            category: data.category || null,
            name: data.name || null,
            description: data.description || '',
            tags: data.tags || null,  // Added
            sku: data.sku || null,  // Added
            barcode: data.barcode || null,  // Added
            brand: data.brand || '',  // Added
            vendor: data.vendor || '',  // Added
            stock: data.stock || null,  // Added
            reserved: data.reserved || null,  // Added
            cost: data.cost || null,  // Added
            basePrice: data.basePrice || null,  // Added
            taxPercent: data.taxPercent || null,  // Added
            price: data.price || null,  // Added
            weight: data.weight || null,  // Added
            thumbnail: data.thumbnail || null,  // Added
            images: data.images || null,  // Added
            active: data.active || true,  // Added
            // Removed address/lead (handled separately)
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
        this.updateFormData(GoodModel.emptyDto());
        
        // Clear all validation states
        this.goodForm.markAsUntouched();
        this.goodForm.markAsPristine();
        
        // Reset each form control individually to ensure clean state
        Object.keys(this.goodForm.controls).forEach(key => {
            const control = this.goodForm.get(key);
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

            
            await this._goodsV2Service.createItem(this.newGood);
            await this._goodsV2Service.getAll();
                    
            if(this.external){
                this.sendGood();
                this.close();
            } else {
                this.close();
                // this._router.navigate(['/crm/goods']);
            }
        } finally {
            this.isLoading.set(false);
        }
    }
              
    sendGood() {
        this.goodCreated.emit(this.newGood);
        this.close();
    }

    /**
     * Open compose dialog
     */
    openDialogBrands(): void {
        // Open the dialog
        const dialogRef = this._matDialog.open(DialogBrandsComponent);

        dialogRef.afterClosed().subscribe((result) => {
            console.log('Compose dialog was closed!');
        });
    }
    

    /**
     * Open compose dialog
     */
    openDialogVendors(): void {
        // Open the dialog
        const dialogRef = this._matDialog.open(DialogVendorsComponent);

        dialogRef.afterClosed().subscribe((result) => {
            console.log('Compose dialog was closed!');
        });
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

        /**
     * Should the create tag button be visible
     *
     * @param inputValue
     */
    shouldShowCreateTagButton(inputValue: string): boolean {
        return !!!(
            inputValue === '' ||
            this.tags.findIndex(
                (tag) => tag.title.toLowerCase() === inputValue.toLowerCase()
            ) > -1
        );
    }


    /**
     * Toggle the tags edit mode
     */
    toggleTagsEditMode(): void {
        this.tagsEditMode = !this.tagsEditMode;
    }

        /**
     * Filter tags input key down event
     *
     * @param event
     */
    filterTagsInputKeyDown(event): void {
        // Return if the pressed key is not 'Enter'
        if (event.key !== 'Enter') {
            return;
        }

        // If there is no tag available...
        if (this.filteredTags.length === 0) {
            // Create the tag
            this.createTag(event.target.value);

            // Clear the input
            event.target.value = '';

            // Return
            return;
        }

        // If there is a tag...
        const tag = this.filteredTags[0];
        const isTagApplied = this.selectedGood.tags.find(
            (id) => id === tag.id
        );

        // If the found tag is already applied to the product...
        if (isTagApplied) {
            // Remove the tag from the product
            this.removeTagFromProduct(tag);
        } else {
            // Otherwise add the tag to the product
            this.addTagToProduct(tag);
        }
    }

    /**
     * Create a new tag
     *
     * @param title
     */
    createTag(title: string): void {
        const newTag: Tag = TagModel.emptyDto();
        const tag = {
            title,
        };
        newTag.title = title;
        newTag.orgId = this.loginUser.orgId;

        // Create tag on the server
        this._tagsV2Service.createItem(newTag).then((response) => {
            // Add the tag to the product
            this.addTagToProduct(response);
        });
    }

    /**
     * Update the tag title
     *
     * @param tag
     * @param event
     */
    updateTagTitle(tag: GoodTag, event): void {
        // Update the title on the tag
        tag.title = event.target.value;

        // Update the tag on the server
        // this._inventoryService
        //     .updateTag(tag.id, tag)
        //     .pipe(debounceTime(300))
        //     .subscribe();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Delete the tag
     *
     * @param tag
     */
    deleteTag(tag: GoodTag): void {
        // Delete the tag from the server
        // this._inventoryService.deleteTag(tag.id).subscribe();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Add tag to the product
     *
     * @param tag
     */
    addTagToProduct(tag: GoodTag): void {
        // Add the tag
        // this.selectedProduct.tags.unshift(tag.id);

        // Update the selected product form
        // this.selectedProductForm
        //     .get('tags')
        //     .patchValue(this.selectedProduct.tags);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove tag from the product
     *
     * @param tag
     */
    removeTagFromProduct(tag: GoodTag): void {
        // Remove the tag
        // this.selectedProduct.tags.splice(
        //     this.selectedProduct.tags.findIndex((item) => item === tag.id),
        //     1
        // );

        // Update the selected product form
        // this.selectedProductForm
        //     .get('tags')
        //     .patchValue(this.selectedProduct.tags);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle product tag
     *
     * @param tag
     * @param change
     */
    toggleProductTag(tag: GoodTag, change: MatCheckboxChange): void {
        if (change.checked) {
            this.addTagToProduct(tag);
        } else {
            this.removeTagFromProduct(tag);
        }
    }

    /**
     * Filter tags
     *
     * @param event
     */
    filterTags(event): void {
        // Get the value
        const value = event.target.value.toLowerCase();

        // Filter the tags
        // this.filteredTags = this.tags.filter((tag) =>
        //     tag.title.toLowerCase().includes(value)
        // );
    }


}