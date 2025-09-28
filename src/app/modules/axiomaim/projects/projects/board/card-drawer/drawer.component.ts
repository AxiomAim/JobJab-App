import { TextFieldModule } from '@angular/cdk/text-field';
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
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
    MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DateTime } from 'luxon';
import { Task, ProjectCard, ProjectCardModel, Image } from '../../project-card.model';
import { ProjectLabel } from '../../project-label.model';
import { MatRadioModule } from '@angular/material/radio';
import { Router, RouterLink } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User } from 'app/modules/davesa/administration/users/user.model';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { DavesaScrollbarDirective } from '@davesa/directives/scrollbar';
import { DavesaDrawerComponent } from '@davesa/components/drawer';
import { Subject } from 'rxjs';
import { UsersV2Service } from 'app/modules/davesa/administration/users/usersV2.service';
import { BooleanInput } from '@angular/cdk/coercion';
import { LoginUserService } from 'app/core/login-user/login-user.service';
import { ProjectList } from '../../project-list.model';
import { DavesaCardComponent } from '@davesa/components/card';
import { UserButtonComponent } from 'app/layout/common/user-button/user-button.component';
import { ProjectBoard } from '../../project-board.model';
import { SelectAutocompleteComponent } from 'app/layout/common/select-autocomplete/select-autocomplete.component';
import { NgClass } from '@angular/common';
import { DavesaConfirmationService } from '@davesa/services/confirmation';

interface StoryPoint {
    value: number;
    viewValue: number;
  }

@Component({
    selector: 'projects-card-drawer',
    templateUrl: './drawer.component.html',
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
        MatRadioModule,
        MatDividerModule,
        MatMenuModule,
        DavesaDrawerComponent,
        DavesaCardComponent,
        UserButtonComponent,
        SelectAutocompleteComponent,
    ],
    providers: [
        DavesaScrollbarDirective
    ]
})
export class ProjectsCardDrawerComponent implements OnInit, OnDestroy {
    @ViewChild(DavesaDrawerComponent) cardDrawer: DavesaDrawerComponent;

    _usersV2Service = inject(UsersV2Service);
    @Input() card: ProjectCard;
    @Input() list: ProjectList;
    @Input() board: ProjectBoard;
    @Output() readonly saveCard: EventEmitter<ProjectCard> =
        new EventEmitter<ProjectCard>();
    @Output() readonly deleteCard: EventEmitter<boolean> =
        new EventEmitter<boolean>();

   priorityOptions = [
    { value: 'low', viewValue: 'Low', color: 'bg-green-500', icon: 'heroicon-o-chevron-down' },
    { value: 'medium', viewValue: 'Medium', color: 'bg-amber-500', icon: 'heroicon-o-chevron-up' },
    { value: 'high', viewValue: 'High', color: 'bg-red-500', icon: 'heroicon-o-chevron-up' },
   ]

   typeOptions = [
    { value: 'feature', viewValue: 'Feature', color: 'bg-indigo-500', icon: 'heroicon-o-light-bulb' },
    { value: 'change', viewValue: 'Change', color: 'bg-amber-500', icon: 'heroicon-o-refresh' },
    { value: 'bug', viewValue: 'Bug', color: 'bg-red-500', icon: 'heroicon-o-bug' },
    { value: 'epic', viewValue: 'Epic', color: 'bg-amber-500', icon: 'heroicon-o-collection' },
   ]

   /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */
    user: User;
    userDetails: boolean = false;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _loginUserService: LoginUserService,
        private _davesaConfirmationService: DavesaConfirmationService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        console.log('Card Details', this.card)
        
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

    emitResult(result: any) {
        console.log('emitResult', result);
        this.saveCard.emit(this.card);

      
    }
    
    onOptionSelected(data: any, type: string) {
        console.log('onOptionSelected', data, type);
        switch (type) {
            case 'priority':
                this.card.priority = data.value;
                break;
            case 'type':
                this.card.type = data.value;
                break;
            case 'user':
                this.card.user = data;
                this.card.userId = data.id;
                break;
            default:
                break;
        }

        this.saveCard.emit(this.card);

    }

    
    /**
     * Drawer opened changed
     *
     * @param opened
     */
    drawerOpenedChanged(opened: boolean): void
    {
        this.saveCard.emit(this.card);
    }


    /**
     * Delete the card
     */
        onDeleteCard(card: any): void {
            // Open the confirmation dialog
            const confirmation = this._davesaConfirmationService.open({
                title: 'Delete card',
                message:
                    'Are you sure you want to delete this card? This action cannot be undone!',
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
                    // Mark for check
                    this.deleteCard.emit(card.id);
                    this._changeDetectorRef.markForCheck();
                }
            });
        }
    
}
