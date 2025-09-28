import { TextFieldModule } from '@angular/cdk/text-field';
import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    inject,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
    MatCheckboxChange,
    MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { assign } from 'lodash-es';
import { DateTime } from 'luxon';
import { BehaviorSubject, Observable, Subject, debounceTime, map, switchMap, switchMapTo, take, takeUntil, tap } from 'rxjs';
import { Task, ProjectCard, ProjectCardModel, Image } from '../../project-card.model';
import { ProjectLabel } from '../../project-label.model';
import { ProjectsV2Service } from '../../ProjectsV2.service';
import { ProjectList } from '../../project-list.model';
import { MatRadioModule } from '@angular/material/radio';
import { Router, RouterLink } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CloudStorageComponent } from 'app/layout/common/cloud-storage/cloud-storage.component';
import { User } from 'app/modules/davesa/administration/users/user.model';
import { Organization } from 'app/modules/davesa/administration/organizations/organizations.model';
import { DavesaCardComponent } from '@davesa/components/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { DavesaScrollbarDirective } from '@davesa/directives/scrollbar';

interface StoryPoint {
    value: number;
    viewValue: number;
  }

@Component({
    selector: 'projects-card-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatTooltipModule,
        NgFor,
        MatRadioModule,
        QuillEditorComponent,
        CloudStorageComponent,
        DavesaCardComponent,
        MatDividerModule,
        MatMenuModule,
        CloudStorageComponent,
        DavesaCardComponent,
        DavesaScrollbarDirective
    ],
    providers: [
        DavesaScrollbarDirective
    ]
})
export class ProjectsCardDetailsComponent implements OnInit, OnDestroy {
    _router = inject(Router);
    _projectsV2Service = inject(ProjectsV2Service);
    @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
    projectCard: ProjectCard;
    projectList = this._projectsV2Service.projectList();

    quillModules: any = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
        ],
    };


    projectCardForm: UntypedFormGroup;
    labels: ProjectLabel[];
    filteredLabels: ProjectLabel[];
    cardPoints: string;
    storyPoints: number[] = [1, 2, 3, 5, 8, 13];
    projectCardChanged: Subject<ProjectCard> = new Subject<ProjectCard>();
    loginUser: User;
    organization: Organization;
    

    // private _projectList: BehaviorSubject<ProjectList | null> = new BehaviorSubject(
    //     null
    // );
    // get projectList$(): Observable<ProjectList> {
    //     return this._projectList.asObservable();
    // }
    
    // private _projectCard: BehaviorSubject<ProjectCard | null> = new BehaviorSubject(
    //     null
    // );
    // get projectCard$(): Observable<ProjectCard> {
    //     return this._projectCard.asObservable();
    // }

    // Private
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<ProjectsCardDetailsComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: UntypedFormBuilder,
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
        this.projectCard = this._projectsV2Service.projectCard();

        // Prepare the card form
        this.projectCardForm = this._formBuilder.group({
            id: null,
            boardId: null,
            title: ['', Validators.required],
            description: '',
            tasks: [],
            createAt: null,

        });


        this.projectCardForm.patchValue(this.projectCard);

        // Get the board
        // const thisProjectList = this._projectsV2Service.projectList();
        const thisProjectCard = this._projectsV2Service.projectCard();
        // this._projectList.next(thisProjectList);
        // this._projectCard.next(thisProjectCard);
        this.projectCardForm.get('title').setValue(thisProjectCard.title);
        this.projectCardForm.get('description').setValue(thisProjectCard.description);
        // this.projectCardForm.setValue(thisProjectCard);

        // this.projectCard$
        //     .pipe(take(1))
        //     .subscribe(
        //         {
        //             next: (projectCard) => {
        //                 this.projectCard = projectCard;
        //                 // Fill the form
        //                 this.projectCardForm.setValue(projectCard);
        //             },
        //             error: (error) => {
        //                 console.error('error', error);
        //             },
        //             complete: () => {
        //         }
                
        //         // (projectCard) => {

            //         // this.projectCard = projectCard;
        //         // // Fill the form
        //         // this.projectCardForm.setValue(projectCard);

        //     });


        // Update card when there is a value change on the card form
        // this.projectCardForm.valueChanges
        //     .pipe(
        //         tap((value) => {
        //             // Update the card object
        //             this.projectCard = assign(this.projectCard, value);
        //         }),
        //         debounceTime(300),
        //         takeUntil(this._unsubscribeAll)
        //     )
        //     .subscribe((value) => {
        //         // Update the card on the server
        //         this._projectsV2Service.updateItemProjectCard(value.id, value).subscribe();

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        //             // Subscribe to note updates
        //             this.projectCardChanged
        //                 .pipe(
        //                     takeUntil(this._unsubscribeAll),
        //                     debounceTime(500),
        //                     switchMap((projectCard) => this._projectsV2Service.updateItemProjectCard(projectCard.id, projectCard))
        //                 )
        //                 .subscribe(() => {
        //                     // Mark for check
        //                     this._changeDetectorRef.markForCheck();
        //                 });
            
    }

        /**
         * Update the note details
         *
         * @param note
         */
        updateProjectCardDetails(projectCard: ProjectCard): void {
            this.projectCardChanged.next(projectCard);
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

    /**
     * Return whether the card has the given label
     *
     * @param label
     */
    // hasCardLabel(label: ProjectLabel): boolean {
    //     return !!this.projectCard.labels.find(
    //         (cardCardLabel) => cardCardLabel.id === label.id
    //     );
    // }

    /**
     * Filter labels
     *
     * @param event
     */
    filterCardLabels(event): void {
        // Get the value
        const value = event.target.value.toLowerCase();

        // Filter the labels
        this.filteredLabels = this.labels.filter((label) =>
            label.title.toLowerCase().includes(value)
        );
    }

    /**
     * Filter labels input key down event
     *
     * @param event
     */
    // filterCardLabelsInputKeyDown(event): void {
    //     // Return if the pressed key is not 'Enter'
    //     if (event.key !== 'Enter') {
    //         return;
    //     }

    //     // If there is no label available...
    //     if (this.filteredLabels.length === 0) {
    //         // Return
    //         return;
    //     }

    //     // If there is a label...
    //     const label = this.filteredLabels[0];
    //     const isLabelApplied = this.projectCard.labels.find(
    //         (cardCardLabel) => cardCardLabel.id === label.id
    //     );

    //     // If the found label is already applied to the card...
    //     if (isLabelApplied) {
    //         // Remove the label from the card
    //         this.removeCardLabelFromCard(label);
    //     } else {
    //         // Otherwise add the label to the card
    //         this.addCardLabelToCard(label);
    //     }
    // }

    /**
     * Toggle card label
     *
     * @param label
     * @param change
     */
    // toggleProductTag(label: ProjectLabel, change: MatCheckboxChange): void {
    //     if (change.checked) {
    //         this.addCardLabelToCard(label);
    //     } else {
    //         this.removeCardLabelFromCard(label);
    //     }
    // }

    /**
     * Add label to the card
     *
     * @param label
     */
    // addCardLabelToCard(label: ProjectLabel): void {
    //     // Add the label
    //     this.projectCard.labels.unshift(label);

    //     // Update the card form data
    //     this.projectCardForm.get('labels').patchValue(this.projectCard.labels);

    //     // Mark for check
    //     this._changeDetectorRef.markForCheck();
    // }

    /**
     * Remove label from the card
     *
     * @param label
     */
    // removeCardLabelFromCard(label: ProjectLabel): void {
    //     // Remove the label
    //     this.projectCard.labels.splice(
    //         this.projectCard.labels.findIndex(
    //             (cardLabel) => cardLabel.id === label.id
    //         ),
    //         1
    //     );

    //     // Update the card form data
    //     this.projectCardForm.get('labels').patchValue(this.projectCard.labels);

    //     // Mark for check
    //     this._changeDetectorRef.markForCheck();
    // }

    /**
     * Check if the given date is overdue
     */
    isOverdue(date: string): boolean {
        return (
            DateTime.fromISO(date).startOf('day') <
            DateTime.now().startOf('day')
        );
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

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Read the given file for demonstration purposes
     *
     * @param file
     */
    private _readAsDataURL(file: File): Promise<any> {
        // Return a new promise
        return new Promise((resolve, reject) => {
            // Create a new reader
            const reader = new FileReader();

            // Resolve the promise on success
            reader.onload = (): void => {
                resolve(reader.result);
            };

            // Reject the promise on error
            reader.onerror = (e): void => {
                reject(e);
            };

            // Read the file as the
            reader.readAsDataURL(file);
        });
    }

        // -----------------------------------------------------------------------------------------------------
        // @ Public methods
        // -----------------------------------------------------------------------------------------------------
    
        onSubmit(): void {
            this.projectCard.title = this.projectCardForm.value.title;
            this.projectCard.description = this.projectCardForm.value.description;
            this._projectsV2Service.updateProjectCard(this.projectCard.id, this.projectCard).subscribe((res: any) => {
                this._router.navigate(['manager/projects/', this.projectCard.boardId]);
                this.matDialogRef.close(this.projectCard);
            });
        }

        close() {
            this.matDialogRef.close();
            this._router.navigate(['manager/projects/', this.projectCard.boardId]);

        }


    /**
     * Add an empty tasks array to note
     *
     * @param note
     */
    addTasksOnProjectCard(projectCard: ProjectCard): void {
        if (!projectCard.tasks) {
            projectCard.tasks = [];
        }
    }

    /**
     * Add task to the given note
     *
     * @param note
     * @param task
     */
    addProjectCardTask(projectCard: ProjectCard, title: string): void {
        if (title.trim() === '') {
            return;
        }

        const sort = projectCard.tasks.length + 1;
        const newTask: Task = ProjectCardModel.emptyTaskDto();
        newTask.sort = sort;
        newTask.title = title;
        projectCard.tasks.push(newTask);
        // const idxProjectCard = this.projectList.cards.findIndex((card) => card.id === projectCard.id);
        // this.projectList.cards[idxProjectCard] = projectCard;

        // Add the task
        this._projectsV2Service.updateProjectList(this.projectList.id, this.projectList).subscribe(
            (res) => {
                const thisProjectList = this._projectsV2Service.projectList();
                const thisProjectCard = this._projectsV2Service.projectCard();    
            },
        );

    }

    /**
     * Remove the given task from given note
     *
     * @param note
     * @param task
     */
    removeTaskFromProjectCard(projectCard: ProjectCard, task: Task): void {
        // Remove the task
        projectCard.tasks = projectCard.tasks.filter((item) => item.id !== task.id);

        // Update the note
        this.projectCardChanged.next(projectCard);
    }

    /**
     * Update the given task on the given note
     *
     * @param note
     * @param task
     */
    updateTaskOnProjectCard(projectCard: ProjectCard, task: Task): void {
        // If the task is already available on the item
        if (task.id) {
            // Update the note
            this.projectCardChanged.next(projectCard);
        }
    }

    setImage(event: any) {
        var newCard: ProjectCard = ProjectCardModel.emptyDto();
        newCard = {...newCard, ...this.projectCard};
        newCard.id = this.projectCard.id;
        const image: Image = {
            imageName: event.fileName,
            imageType: event.fileType,
            imagePath: event.filePath,
            imageUrl: event.fileUrl,
        }; 
        newCard.images.push(image)
        this.projectCard = newCard;
        this._projectsV2Service.updateProjectCard(this.projectCard.id, this.projectCard).subscribe((res) => {

        });
    }

        /**
     * Add an empty tasks array to note
     *
     * @param note
     */
        addTasksToNote(card): void {
            if (!card.tasks) {
                card.tasks = [];
            }
        }
    
        /**
         * Add task to the given note
         *
         * @param note
         * @param task
         */
        addTaskToNote(card: ProjectCard, task: string): void {
            if (task.trim() === '') {
                return;
            }
    
            // Add the task
            // this._notesService.addTask(note, task).subscribe();
        }
    
        /**
         * Remove the given task from given note
         *
         * @param note
         * @param task
         */
        removeTaskFromNote(card: ProjectCard, task: Task): void {
            // Remove the task
            // note.tasks = note.tasks.filter((item) => item.id !== task.id);
    
            // Update the note
            // this.noteChanged.next(note);
        }
    
        /**
         * Update the given task on the given note
         *
         * @param note
         * @param task
         */
        updateTaskOnNote(card: ProjectCard, task: Task): void {
            // If the task is already available on the item
            if (task.id) {
                // Update the note
                // this.projectCard.next(note);
            }
        }
    
        /**
         * Add an empty tasks array to note
         *
         * @param note
         */
        addTasksOnTestCard(card: ProjectCard): void {
            if (!card.tasks) {
                card.tasks = [];
            }
        }

        removeImage(item) {
            this.projectCard.images = this.projectCard.images.filter((image) => image.imageName !== item.imageName);
        }
    
    
}
