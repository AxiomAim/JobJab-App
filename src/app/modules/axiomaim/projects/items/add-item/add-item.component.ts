import { NgClass, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild, ViewEncapsulation, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { AxiomaimDrawerComponent } from '@axiomaim/components/drawer';
import {
    AxiomaimConfig,
    AxiomaimConfigService,
} from '@axiomaim/services/config';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
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
import { ItemsV2Service } from '../items-v2.service';
import { User } from 'app/modules/axiomaim/administration/users/users.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AxiomaimCardComponent } from '@axiomaim/components/card';
import { ImageGalleryComponent } from 'app/layout/common/image-gallery/image-gallery.component';
import { Item, ItemModel } from '../items.model';
import { Image } from 'app/core/models/image.model';

export interface Category {
  name: string;
}

interface ItemType {
  value: string;
  viewValue: string;
}
@Component({
    selector: 'items-add-item',
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

            .chip-list {
                width: 100%;
            }
            .item-type-select {
                width: 100%;
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
        AxiomaimCardComponent,
        ImageGalleryComponent
        

    ]
})
export class ItemsAddItemComponent implements OnInit, AfterViewInit, OnDestroy {
    public testImages: Image[] = [
        {
            id: '2bfa2be5-7688-48d5-b5ac-dc0d9ac97f14',
            orgId: '39d9e6b5-f826-43e9-b3b3-d49fbc2ea664',
            source: 'images/avatars/female-10.jpg',
            title: 'Nadia Mcknight',
            sort: 1,
        },
        {
            id: '77a4383b-b5a5-4943-bc46-04c3431d1566',
            orgId: '39d9e6b5-f826-43e9-b3b3-d49fbc2ea664',
            source: 'images/avatars/male-19.jpg',
            title: 'Best Blackburn',
            sort: 1,
        },
        {
            id: '8bb0f597-673a-47ca-8c77-2f83219cb9af',
            orgId: '39d9e6b5-f826-43e9-b3b3-d49fbc2ea664',
            source: 'images/avatars/male-14.jpg',
            title: 'Duncan Carver',
            sort: 1,
        },
        {
            id: 'c318e31f-1d74-49c5-8dae-2bc5805e2fdb',
            orgId: '39d9e6b5-f826-43e9-b3b3-d49fbc2ea664',
            source: 'images/avatars/male-01.jpg',
            title: 'Martin Richards',
            sort: 1,
        },
        {
            id: '0a8bc517-631a-4a93-aacc-000fa2e8294c',
            orgId: '39d9e6b5-f826-43e9-b3b3-d49fbc2ea664',
            source: 'images/avatars/female-20.jpg',
            title: 'Candice Munoz',
            sort: 1,
        },
        {
            id: 'a4c9945a-757b-40b0-8942-d20e0543cabd',
            orgId: '39d9e6b5-f826-43e9-b3b3-d49fbc2ea664',
            source: 'images/avatars/female-01.jpg',
            title: 'Vickie Mosley',
            sort: 1,
        },
        {
            id: 'b8258ccf-48b5-46a2-9c95-e0bd7580c645',
            orgId: '39d9e6b5-f826-43e9-b3b3-d49fbc2ea664',
            source: 'images/avatars/female-02.jpg',
            title: 'Tina Harris',
            sort: 1,
        },
        {
            id: 'f004ea79-98fc-436c-9ba5-6cfe32fe583d',
            orgId: '39d9e6b5-f826-43e9-b3b3-d49fbc2ea664',
            source: 'images/avatars/male-02.jpg',
            title: 'Holt Manning',
            sort: 1,
        },
        {
            id: '8b69fe2d-d7cc-4a3d-983d-559173e37d37',
            orgId: '39d9e6b5-f826-43e9-b3b3-d49fbc2ea664',
            source: 'images/avatars/female-03.jpg',
            title: 'Misty Ramsey',
            sort: 1,
        },
        {
            id: '8b69fe2d-d7cc-4a3d-983d-559173e37d37',
            orgId: '39d9e6b5-f826-43e9-b3b3-d49fbc2ea664',
            source: 'images/cards/34-640x480.jpg',
            title: 'Misty Ramsey',
            sort: 1,
        },
    ];


    _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
    _itemsV2Service = inject(ItemsV2Service);
    _alertMessagesService = inject(AlertMessagesService);

    readonly addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    readonly categories = signal<Category[]>([]);
    readonly announcer = inject(LiveAnnouncer);
    selectedValue: string;
    itemTypes: ItemType[] = [
        {value: 'product', viewValue: 'Product'},
        {value: 'service', viewValue: 'Service'},
    ];

    @ViewChild('newItemDrawer') newItemDrawer: AxiomaimDrawerComponent;
    @Output() drawerStateChanged = new EventEmitter<boolean>();

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    item: Item = ItemModel.emptyDto();
    itemForm: UntypedFormGroup;
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

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _axiomaimConfigService: AxiomaimConfigService
    ) {
        this.#loginUser.set(this._firebaseAuthV2Service.loginUser());
        console.log('#loginUser', this.#loginUser());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Functions
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.setFormGroup();
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


    /**
     * Set Form Group 
     */
    setFormGroup() {

        this.itemForm = this._formBuilder.group({
            sku: [""],
            // categories: [[], [Validators.required]],
            name: ["", [Validators.required]],
            description: ["", [Validators.required]],
            price: ["", [Validators.required]],
            itemType: [[], [Validators.required]],
            // images: this._formBuilder.array([]),
          });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    
    add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.categories.update(categories => [...categories, {name: value}]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(category: Category): void {
    this.categories.update(categories => {
      const index = categories.indexOf(category);
      if (index < 0) {
        return categories;
      }

      categories.splice(index, 1);
      this.announcer.announce(`Removed ${category.name}`);
      return [...categories];
    });
  }

  edit(category: Category, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(category);
      return;
    }

    // Edit existing fruit
    this.categories.update(categories => {
      const index = categories.indexOf(category);
      if (index >= 0) {
        categories[index].name = value;
        return [...categories];
      }
      return categories;
    });
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
        // Reset form values
        this.itemForm.reset();
        
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
        
        // Set default values for form fields that need them
        this.itemForm.patchValue({
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
