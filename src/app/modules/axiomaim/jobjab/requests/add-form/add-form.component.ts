import { Component, OnDestroy, OnInit, signal, ViewChild, ViewEncapsulation, Output, EventEmitter, AfterViewInit, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AxiomaimDrawerComponent } from '@axiomaim/components/drawer';
import { Subject, takeUntil } from 'rxjs';
import { MatRippleModule } from '@angular/material/core';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { RequestsV2Service } from '../requests-v2.service';
import { FormCreatorComponent } from 'app/modules/axiomaim/jobjab/forms/form-creator/form-creator.component';
import { FormlyCreatorComponent } from 'app/layout/common/formly-creator/formly-creator.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'requests-add-form',
    templateUrl: './add-form.component.html',
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
        MatFormFieldModule,
        AxiomaimDrawerComponent,
        MatButtonModule,
        FormlyCreatorComponent
    ]
})
export class RequestsAddFormComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() btnIcon: string = 'mat_outline:add';
    @Input() btnTitle: string = 'Add';
    @Input() external: boolean = false;
    @Output() requestCreated: EventEmitter<Request> = new EventEmitter<Request>();
    loginUser = inject(FirebaseAuthV2Service).loginUser();
    public _requestsV2Service = inject(RequestsV2Service);

    @ViewChild('newItemDrawer') newItemDrawer: AxiomaimDrawerComponent;
    @Output() drawerStateChanged = new EventEmitter<boolean>();

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    isLoading = signal<boolean>(false);
    
    /**
     * Constructor
     */
    constructor(
    ) {
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    
    openDrawer(): void {
        // Reset form to ensure clean state when opening
        console.log('openDrawer - resetting form');
        
        // Open the drawer
        this.newItemDrawer.open();
    }

    /**
     * Close Drawer (does not save form data) 
     */
    close(): void {
        // Close the drawer
        this.newItemDrawer.close();
    }


    /**
     * Submit and create User
     * Sned email to new user to set up their password
     * refreshes all users in service
     * closes the drawer 
     */

    async onSubmit() {
    }
              


    sendContact() {
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