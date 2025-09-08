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
import { UsersListComponent } from 'app/modules/axiomaim/administration/users/list/list.component';
import { BehaviorSubject, Observable, Subject, debounceTime, takeUntil } from 'rxjs';
import { Country, User } from '../user.model';
import { UsersV2Service } from '../usersV2.service';
import { AxiomaimLoadingService } from '@axiomaim/services/loading';
import { UserRolesV2Service } from '../../user-roles/userRolesV2.service';
import { UserRole } from '../../user-roles/user-role.model';
import { SelectMultiComponent } from 'app/layout/common/select-multi/select-multi.component';
import { Organization } from '../../organizations/organizations.model';


interface PhonenumberType {
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
        SelectMultiComponent,
    ],
})
export class UsersDetailsComponent implements OnInit, OnDestroy {
    _usersV2Service = inject(UsersV2Service);
    _userRolesV2Service = inject(UserRolesV2Service);
    _axiomaimLoadingService = inject(AxiomaimLoadingService);
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;
    private _user: BehaviorSubject<User | null> = new BehaviorSubject(
        null
    );
    get user$(): Observable<User> {
        return this._user.asObservable();
    }


    userRoles: UserRole[] = [];

    private _countries: BehaviorSubject<Country[] | null> = new BehaviorSubject(
        []
    );
    get countries$(): Observable<Country[]> {
        return this._countries.asObservable();
    }

    countries: Country[];
    
    phonenumberTypes: PhonenumberType[] = [
        {value: 'mobile', viewValue: 'Mobile'},
        {value: 'work', viewValue: 'Work'},
        {value: 'home', viewValue: 'Home'},
        {value: 'other', viewValue: 'Other'},
        ];
    


    editMode: boolean = false;
    tags: Tag[];
    tagsEditMode: boolean = false;
    filteredTags: Tag[];
    user: User;
    userForm: UntypedFormGroup;
    users: User[];
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    loginUser: User;
    organization: Organization;
    showRole: string[] = ["admin"];

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _usersListComponent: UsersListComponent,
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
        this._usersV2Service.initialize();
        this.loginUser = this._usersV2Service.loginUser();
        this.organization = this._usersV2Service.organization();
        this.users = this._usersV2Service.users();
        this.user = this._usersV2Service.user();
        this.userRoles = this._usersV2Service.userRoles();
        // Open the drawer
        this._usersListComponent.matDrawer.open();
        const phonePattern = "^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$"; 

        // Create the user form
        this.userForm = this._formBuilder.group({
            id: [''],
            avatar: [null],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            phoneNumbers: this._formBuilder.array([]),
            address: [null],
            activeUser:  [true, [Validators.required]],
        });

        this._changeDetectorRef.markForCheck();

        this._usersListComponent.matDrawer.open();
        this.userForm.patchValue(this.user);
        this._countries.next(this._usersV2Service.countries());

        // Get the country telephone codes
        this.countries$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((codes: Country[]) => {
                this.countries = codes;

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
        return this._usersListComponent.matDrawer.close();
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
        this.user = {...this._user.getValue(), ...this.userForm.getRawValue()};
        console.log('user', this.user);
        // Get the user object
        // const user = this.userForm.getRawValue();

        // Update the user on the server
        this._usersV2Service
            .updateItem(this.user.id, this.user)
            .subscribe(() => {
                // Toggle the edit mode off
                this.toggleEditMode(false);
            });
    }

    /**
     * Delete the user
     */
    deleteUser(): void {
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
                const id = this.user.id;

                // Get the next/previous user's id
                const currentUserIndex = this.users.findIndex(
                    (item) => item.id === id
                );
                const nextUserIndex =
                    currentUserIndex +
                    (currentUserIndex === this.users.length - 1 ? -1 : 1);
                const nextUserId =
                    this.users.length === 1 && this.users[0].id === id
                        ? null
                        : this.users[nextUserIndex].id;

                // Delete the user
                this._usersV2Service
                    .deleteItem(id)
                    .subscribe((isDeleted) => {
                        // Return if the user wasn't deleted...
                        if (!isDeleted) {
                            return;
                        }

                        // Navigate to the next user if available
                        if (nextUserId) {
                            this._router.navigate(['../', nextUserId], {
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

    /**
     * Upload avatar
     *
     * @param fileList
     */
    uploadAvatar(event: any): void {
        console.log('event', event.target.files[0])
        this._axiomaimLoadingService.show()        
        this._usersV2Service.uploadAvatar(event.target.files[0], 'users').subscribe({
            next: (response: any) => {
                this._axiomaimLoadingService.hide();
                console.log('uploadAvatar', response)
                this.user.avatarPath = response.filePath;
                this.user.avatarFile = response.fileName;
                this.user.avatarType = response.fileType;
                this.user.avatarUrl = response.fileUrl;
                this.user.avatar = response.fileUrl;                
                this._user.next(this.user);
                console.log('user', this.user);
            },
            error: (error: any) => {
                this._axiomaimLoadingService.hide();
                console.error('error', error);
            },
        });
    }

    /**
     * Remove the avatar
     */
    removeAvatar(): void {
        // Get the form control for 'avatar'
        const avatarFormControl = this.userForm.get('avatar');

        // Set the avatar as null
        avatarFormControl.setValue(null);

        // Set the file input value as null
        this._avatarFileInput.nativeElement.value = null;

        // Update the user
        this.user.avatar = null;
    }

    onOptionSelected(data: any[]) {
        console.log('onOptionSelected', data);
        this.user.userRoles = data;
        this._user.next(this.user);
        // console.log('onOptionSelected', this.user);
        // this.user$.subscribe((resUser: User) => {

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
    //         this.removeTagFromUser(tag);
    //     } else {
    //         // Otherwise add the tag to the user
    //         this.addTagToUser(tag);
    //     }
    // }


        /**
     * Get country info by iso code
     *
     * @param iso
     */
        getCountryByIso(iso: string): Country {
            if(iso) {
                return this.countries.find((country) => country.iso === iso);
    
            }
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
