import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { TextFieldModule } from '@angular/cdk/text-field';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    inject,
    OnDestroy,
    OnInit,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormArray,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AxiomaimConfirmationService } from '@axiomaim/services/confirmation';
import { Tag } from 'app/core/models/tag.model';
import { BehaviorSubject, Observable, Subject, debounceTime, takeUntil } from 'rxjs';
import { UserRole } from '../user-role.model';
import { UserRolesV2Service } from '../userRolesV2.service';
import { AxiomaimLoadingService } from '@axiomaim/services/loading';
import { SelectMultiComponent } from 'app/layout/common/select-multi/select-multi.component';
import { UsersV2Service } from '../../users/usersV2.service';
import { UserRolesListComponent } from '../list/list.component';
import { User } from '../../users/user.model';


interface PhonenumerType {
    value: string;
    viewValue: string;
  }

@Component({
    selector: 'users-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatButtonModule,
        MatTooltipModule,
        RouterLink,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        MatOptionModule,
        MatDatepickerModule,
        TextFieldModule,
        AsyncPipe,
    ],
})
export class UserRolesDetailsComponent implements OnInit, OnDestroy {
    _usersV2Service = inject(UsersV2Service);
    _userRolesV2Service = inject(UserRolesV2Service);
    _axiomaimLoadingService = inject(AxiomaimLoadingService);
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;
    private _userRole: BehaviorSubject<UserRole | null> = new BehaviorSubject(
        null
    );
    get userRole$(): Observable<UserRole> {
        return this._userRole.asObservable();
    }

    private _userRoles: BehaviorSubject<UserRole[] | null> = new BehaviorSubject(
        []
    );
    get userRoles$(): Observable<UserRole[]> {
        return this._userRoles.asObservable();
    }

    userRoles: UserRole[] = [];
    editMode: boolean = false;
    tags: Tag[];
    tagsEditMode: boolean = false;
    filteredTags: Tag[];
    userRole: UserRole;
    userForm: UntypedFormGroup;
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    loginUser: User;
    showRole: string[] = ["admin"];

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _userRolesListComponent: UserRolesListComponent,
        private _formBuilder: UntypedFormBuilder,
        private _axiomaimConfirmationService: AxiomaimConfirmationService,
        private _renderer2: Renderer2,
        private _router: Router,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._usersV2Service.loadFromStorage();
        this.loginUser = this._usersV2Service.loginUser();
        this._userRolesV2Service.getAll().subscribe((userRoles: UserRole[]) => {
            this.userRoles = userRoles;
            this._userRoles.next(userRoles);
        });
        // Open the drawer
        this._userRolesListComponent.matDrawer.open();
        const phonePattern = "^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$"; 

        // Create the user form
        this.userForm = this._formBuilder.group({
            id: [''],
            name: ['', [Validators.required]],
        });

        // Get the users
        this.userRoles = this._userRolesV2Service.userRoles();
            // .pipe(takeUntil(this._unsubscribeAll))
            // .subscribe((users: UserRole[]) => {
                // this.users = users;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            // });

        this._userRole.next(this._userRolesV2Service.userRole());

        // Get the user
        this.userRole$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((userRole: UserRole) => {
                // Open the drawer in case it is closed
                this._userRolesListComponent.matDrawer.open();

                // Get the user
                this.userRole = userRole;

                // Patch values to the form
                this.userForm.patchValue(userRole);

                // Toggle the edit mode off
                this.toggleEditMode(false);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        // Dispose the overlays if they are still on the DOM
        if (this._tagsPanelOverlayRef) {
            this._tagsPanelOverlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._userRolesListComponent.matDrawer.close();
    }

    /**
     * Toggle edit mode
     *
     * @param editMode
     */
    toggleEditMode(editMode: boolean | null = null): void {
        if (editMode === null) {
            this.editMode = !this.editMode;
        } else {
            this.editMode = editMode;
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Update the user
     */
    updateItem(): void {        
        this.userRole = {...this._userRole.getValue(), ...this.userForm.getRawValue()};
        // Get the user object
        // const user = this.userForm.getRawValue();

        // Update the user on the server
        this._userRolesV2Service
            .updateItem(this.userRole.id, this.userRole)
            .subscribe(() => {
                // Toggle the edit mode off
                this.toggleEditMode(false);
            });
    }

    /**
     * Delete the user
     */
    deleteUserRole(): void {
        // Open the confirmation dialog
        const confirmation = this._axiomaimConfirmationService.open({
            title: 'Delete user',
            message:
                'Are you sure you want to delete this user? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                // Get the current user's id
                const id = this.userRole.id;

                // Get the next/previous user's id
                const currentUserRoleIndex = this.userRoles.findIndex(
                    (item) => item.id === id
                );
                const nextUserRoleIndex =
                    currentUserRoleIndex +
                    (currentUserRoleIndex === this.userRoles.length - 1 ? -1 : 1);
                const nextUserRoleId =
                    this.userRoles.length === 1 && this.userRoles[0].id === id
                        ? null
                        : this.userRoles[nextUserRoleIndex].id;

                // Delete the user
                this._usersV2Service
                    .deleteItem(id)
                    .subscribe((isDeleted) => {
                        // Return if the user wasn't deleted...
                        if (!isDeleted) {
                            return;
                        }

                        // Navigate to the next user if available
                        if (nextUserRoleId) {
                            this._router.navigate(['../', nextUserRoleId], {
                                relativeTo: this._activatedRoute,
                            });
                        }
                        // Otherwise, navigate to the parent
                        else {
                            this._router.navigate(['../'], {
                                relativeTo: this._activatedRoute,
                            });
                        }

                        // Toggle the edit mode off
                        this.toggleEditMode(false);
                    });

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });
    }


    onOptionSelected(data: any[]) {
        this.userRoles = data;
        this._userRole.next(this.userRole);
        // console.log('onOptionSelected', this.user);
        // this.user$.subscribe((resUserRole: UserRole) => {

        // });
    }
    /**
     * Open tags panel
     */
    openTagsPanel(): void {
        // Create the overlay
        this._tagsPanelOverlayRef = this._overlay.create({
            backdropClass: '',
            hasBackdrop: true,
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay
                .position()
                .flexibleConnectedTo(this._tagsPanelOrigin.nativeElement)
                .withFlexibleDimensions(true)
                .withViewportMargin(64)
                .withLockedPosition(true)
                .withPositions([
                    {
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top',
                    },
                ]),
        });

        // Subscribe to the attachments observable
        this._tagsPanelOverlayRef.attachments().subscribe(() => {
            // Add a class to the origin
            this._renderer2.addClass(
                this._tagsPanelOrigin.nativeElement,
                'panel-opened'
            );

            // Focus to the search input once the overlay has been attached
            this._tagsPanelOverlayRef.overlayElement
                .querySelector('input')
                .focus();
        });

        // Create a portal from the template
        const templatePortal = new TemplatePortal(
            this._tagsPanel,
            this._viewContainerRef
        );

        // Attach the portal to the overlay
        this._tagsPanelOverlayRef.attach(templatePortal);

        // Subscribe to the backdrop click
        this._tagsPanelOverlayRef.backdropClick().subscribe(() => {
            // Remove the class from the origin
            this._renderer2.removeClass(
                this._tagsPanelOrigin.nativeElement,
                'panel-opened'
            );

            // If overlay exists and attached...
            if (
                this._tagsPanelOverlayRef &&
                this._tagsPanelOverlayRef.hasAttached()
            ) {
                // Detach it
                this._tagsPanelOverlayRef.detach();

                // Reset the tag filter
                this.filteredTags = this.tags;

                // Toggle the edit mode off
                this.tagsEditMode = false;
            }

            // If template portal exists and attached...
            if (templatePortal && templatePortal.isAttached) {
                // Detach it
                templatePortal.detach();
            }
        });
    }

    /**
     * Toggle the tags edit mode
     */
    toggleTagsEditMode(): void {
        this.tagsEditMode = !this.tagsEditMode;
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
        this.filteredTags = this.tags.filter((tag) =>
            tag.title.toLowerCase().includes(value)
        );
    }

    /**
     * Filter tags input key down event
     *
     * @param event
     */
    // filterTagsInputKeyDown(event): void {
    //     // Return if the pressed key is not 'Enter'
    //     if (event.key !== 'Enter') {
    //         return;
    //     }

    //     // If there is no tag available...
    //     if (this.filteredTags.length === 0) {
    //         // Create the tag
    //         this.createTag(event.target.value);

    //         // Clear the input
    //         event.target.value = '';

    //         // Return
    //         return;
    //     }

    //     // If there is a tag...
    //     const tag = this.filteredTags[0];
    //     const isTagApplied = this.user.tags.find((id) => id === tag.id);

    //     // If the found tag is already applied to the user...
    //     if (isTagApplied) {
    //         // Remove the tag from the user
    //         this.removeTagFromUserRole(tag);
    //     } else {
    //         // Otherwise add the tag to the user
    //         this.addTagToUserRole(tag);
    //     }
    // }

        
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
