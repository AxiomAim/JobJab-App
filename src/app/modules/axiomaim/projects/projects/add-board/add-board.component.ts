import { Component, ElementRef, inject, OnInit, Renderer2, TemplateRef, ViewChild, ViewEncapsulation, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    UntypedFormArray,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { BehaviorSubject, finalize, map, Observable, Subject, switchMap, switchMapTo, takeUntil, takeWhile, tap, timer } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { DavesaConfirmationService } from '@davesa/services/confirmation';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { TextFieldModule } from '@angular/cdk/text-field';
import { DavesaLoadingService } from '@davesa/services/loading';
import { DavesaLoadingBarComponent } from '@davesa/components/loading-bar';
import { Router } from '@angular/router';
import { IconPickerComponent } from '@davesa/components/icon-picker/icon-picker.component';
import { User } from 'app/modules/davesa/administration/users/user.model';
import { Organization } from 'app/modules/davesa/administration/organizations/organizations.model';
import { ProjectsV2Service } from '../ProjectsV2.service';
import { ProjectBoard, ProjectBoardModel } from '../project-board.model';
import { ProjectList, ProjectListModel } from '../project-list.model';


@Component({
    selector: 'projects-add-board',
    templateUrl: './add-board.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatRippleModule,
        MatCheckboxModule,
        MatSelectModule,
        MatOptionModule,
        TextFieldModule,
        // DavesaLoadingBarComponent,
        IconPickerComponent,
        
        // IconsComponent
    ],
})
export class ProjectsAddBoardComponent implements OnInit {
    _projectsV2Service = inject(ProjectsV2Service);
    project = inject(MAT_DIALOG_DATA);
    _router = inject(Router);
    _davesaLoadingService = inject(DavesaLoadingService);
    _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
    projectBoard: ProjectBoard = ProjectBoardModel.emptyDto();    
    projectList: ProjectList[] = [];    
    private _projectBoard: BehaviorSubject<ProjectBoard | null> = new BehaviorSubject(
        null
    );
    get projectBoard$(): Observable<ProjectBoard> {
        return this._projectBoard.asObservable();
    }


    get projectList$(): Observable<ProjectList> {
        return this._projectList.asObservable();
    }
    private _projectList: BehaviorSubject<ProjectList | null> = new BehaviorSubject(
        null
    );

    loginUser: User;
    organization: Organization;

    composeForm: UntypedFormGroup;
    countdown: number = 5;
    fileFormat: "image/png, image/jpeg";
    position: number = 1;
    projectLists: ProjectList[] = [];
    selectedIcon: any = ['davesa', 'davesa-c']
    iconSize: any = 'icon-size-16';


    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;

    editMode: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<ProjectsAddBoardComponent>,
        private _formBuilder: UntypedFormBuilder,
        private _overlay: Overlay,
        private _renderer2: Renderer2,
        private _viewContainerRef: ViewContainerRef,
        private _changeDetectorRef: ChangeDetectorRef,
        private _davesaConfirmationService: DavesaConfirmationService

    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */ 
    ngOnInit(): void {
        this.loginUser = this._projectsV2Service.loginUser();
        this.organization = this._projectsV2Service.organization();
        this.projectBoard.title = this.project.title;
        this._projectBoard.next(this.projectBoard);

        // Create the form
        this.composeForm = this._formBuilder.group({
            title: ['', [Validators.required]],
            icon: ['', [Validators.required]],
            description: ['', [Validators.required]],
            lists: this._formBuilder.array([]),

        });

        // Setup the phone numbers form array
        const listsFormGroups: UntypedFormGroup[] = [];
        var list: ProjectList = ProjectListModel.emptyDto();
        list.orgId = this.organization.id;
        list.userId = this.loginUser.id;
        list.boardId = this.projectBoard.id;
        list.position = this.position;
        this.position = this.position + 1;
        this.projectLists.push(list);
        
        if (this.projectLists.length > 0) {
            // Iterate through them
            this.projectLists.forEach((projectLists) => {
                // Create an email form group
                listsFormGroups.push(
                    this._formBuilder.group({
                        id: [null],
                        boardId: [null],
                        position: [projectLists.position],
                        title: [projectLists.title],
                        cards: [this._formBuilder.array([])],
                    })
                );
            });
        } else {
            // Create a phone number form group
            listsFormGroups.push(
                this._formBuilder.group({
                    id: [list.id],
                    boardId: [list.boardId],
                    position: [list.position],
                    title: [list.title],
                })
            );
        }

        // Add the phone numbers form groups to the phone numbers form array
        listsFormGroups.forEach((listFormGroup) => {
            (this.composeForm.get('lists') as UntypedFormArray).push(listFormGroup);
        });
        
        // Patch values to the form
        this.composeForm.patchValue(this.projectBoard);

        this.onIconPickerSelect();
        // Mark for check
        this._changeDetectorRef.markForCheck();
            
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onSubmit(): void {
        if (this.composeForm.valid) {
            const myLists: ProjectList[] = [];
            let sort = 0;
            (this.composeForm.get('lists') as UntypedFormArray).controls.forEach(element => {
                const newList: ProjectList = ProjectListModel.toDto(element.value);
                newList.title = element.get('title').value;
                newList.position = sort;
                sort = sort + 1;
                newList.sort = sort;
                newList.orgId = this.organization.id;
                newList.userId = this.loginUser.id;
                newList.boardId = this.projectBoard.id;
                myLists.push(newList);
            });
            console.log('myLists', myLists)
            this.project.boardId = this.projectBoard.id;
            this.projectBoard.orgId = this.organization.id;
            this.projectBoard.userId = this.loginUser.id;
            this.projectBoard.title = this.composeForm.get('title').value;
            this.projectBoard.icon = this.composeForm.get('icon').value;
            this.projectBoard.description = this.composeForm.get('description').value;
            this._projectsV2Service.createProjectBoard(this.projectBoard).pipe(
                switchMap((res) => {
                    return this._projectsV2Service.createProjectBoard(this.projectBoard).pipe(switchMap(() => {
                        return this._projectsV2Service.updateProject(this.project.id, this.project).pipe(switchMap(() => {
                            return this._projectsV2Service.bulkCreateProjectList(myLists).pipe(map((res) => {
                                return res;
                            }));        
                        }));
                    }));
                }),
                tap(() => {
                    this._router.navigate(['./']);
                    this.matDialogRef.close(this.project);
                })
            ).subscribe((res) => {
                console.log('res', res);
            });
        }
            return;
    }
    
    
    selectedOption(event: any) {
        this.composeForm.get('projectRoles').setValue(event);
        console.log('selectedOption:form', this.composeForm.get('projectRoles').value);
    }

    close() {
        this.matDialogRef.close();
    }

    /**
     * Save and close
     */
    saveAndClose(): void {
        // Save the message as a draft
        this.saveAsDraft();

        // Close the dialog
        this.matDialogRef.close();
    }

    /**
     * Discard the message
     */
    discard(): void {}

    /**
     * Save the message as a draft
     */
    saveAsDraft(): void {}

    /**
     * Send the message
     */
    send(): void {}


    /**
     * Add the email field
     */
    addListField(): void {
        var newProjectList: ProjectList = ProjectListModel.emptyDto();
        newProjectList.boardId = this.projectBoard.id;
        newProjectList.position = this.position;
        this.position = this.position + 1;

        // Create an empty email form group
        const listFormGroup = this._formBuilder.group({
            id: [newProjectList.id],
            boardId: [newProjectList.boardId],
            position: [newProjectList.position],
            title: [newProjectList.title],
        });

        // Add the email form group to the emails form array
        (this.composeForm.get('lists') as UntypedFormArray).push(
            listFormGroup
        );

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove the email field
     *
     * @param index
     */
    removeListField(index: number): void {
        this.position = this.position - 1;

        // Get form array for emails
        const listsFormArray = this.composeForm.get(
            'lists'
        ) as UntypedFormArray;

        // Remove the email field
        listsFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }


    

    setScheme(event:any) {
    
    }
    
    setTheme(event:any) {
    
    }
    
    onIconPickerSelect(data?:any):void{
        if(data){
            this.selectedIcon = data;
        } 
        this.composeForm.get('icon').setValue(this.selectedIcon);
    }

    onIconChange(data: any) {
        console.log('onIconChange', data);

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
