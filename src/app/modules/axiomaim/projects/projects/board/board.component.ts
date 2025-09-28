import {
    CdkDrag,
    CdkDragDrop,
    CdkDragHandle,
    CdkDropList,
    CdkDropListGroup,
    moveItemInArray,
    transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { FormsModule, NgModel, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DavesaConfirmationService } from '@davesa/services/confirmation';
import { DateTime } from 'luxon';
import { BehaviorSubject, map, Observable, Subject, switchMap, take, takeUntil } from 'rxjs';
import { ProjectsV2Service } from '../ProjectsV2.service';
import { ProjectBoard } from '../project-board.model';
import { ProjectList, ProjectListModel } from '../project-list.model';
import { ProjectCard, ProjectCardModel, ProjectLog } from '../project-card.model';
import { User } from 'app/modules/davesa/administration/users/user.model';
import { Organization } from 'app/modules/davesa/administration/organizations/organizations.model';
import { ProjectsBoardAddListComponent } from './add-list/add-list.component';
import { ProjectsBoardAddCardComponent } from './add-card/add-card.component';
import { SortByIndexPipe } from '@davesa/pipes/sortByIndex.pipe';
import { MatDividerModule } from '@angular/material/divider';
import { ProjectsComponent } from '../projects.component';
import { ProjectsBoardSettingsComponent } from './settings/settings.component';
import { ProjectsCardDrawerComponent } from './card-drawer/drawer.component';
import { UsersService } from 'app/core/users/users.service';
import { SelectAutocompleteAvatarComponent } from 'app/layout/common/select-autocomplete-avatar/select-autocomplete-avatar.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LocalV2Service } from 'app/core/services/local-v2.service';

@Component({
    selector: 'projects-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatButtonModule,
        RouterLink,
        MatIconModule,
        CdkScrollable,
        CdkDropList,
        CdkDropListGroup,
        CdkDrag,
        CdkDragHandle,
        MatMenuModule,
        FormsModule,
        ProjectsBoardAddCardComponent,
        ProjectsBoardAddListComponent,
        RouterOutlet,
        MatCheckboxModule,
        NgIf,
        SortByIndexPipe,
        MatDividerModule,
        ProjectsBoardSettingsComponent,
        // CloudStorageComponent,
        ProjectsCardDrawerComponent,

    ],
    providers: [
        SortByIndexPipe,
    ],
})
export class ProjectsBoardComponent implements OnInit, OnDestroy {
    _projectsV2Service = inject(ProjectsV2Service);
    _usersService = inject(UsersService);
    _localV2Service = inject(LocalV2Service);
    allUsers: User[] = [];

    projectBoard: ProjectBoard;
    projectLists: ProjectList[] = [];
    projectCards: ProjectCard[] = [];
    listTitleForm: UntypedFormGroup;
    loginUser: User;
    organization: Organization
    mergedLists: any[];
    showBacklog: boolean = false;

    // Private
    private readonly _positionStep: number = 65536;
    private readonly _maxListCount: number = 200;
    private readonly _maxPosition: number = this._positionStep * 500;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: UntypedFormBuilder,
        private _davesaConfirmationService: DavesaConfirmationService,
        public projectsComponent: ProjectsComponent,

    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._localV2Service.loadFromStorage();    
        this.showBacklog = this._localV2Service.viewBacklog();    

        this.loginUser = this._projectsV2Service.loginUser();
        this._usersService.users$.subscribe((users) => {
            this.allUsers = users;
        });
        this.organization = this._projectsV2Service.organization();
        this.listTitleForm = this._formBuilder.group({
            title: [''],
        });

        this.projectBoard = this._projectsV2Service.projectBoard();
        this.projectLists = this._projectsV2Service.projectLists();
        this.projectCards = this._projectsV2Service.projectCards();
        this.mergedLists = this.projectLists.map(list => {
            return {
              ...list,
              cards: this.projectCards.filter(card => card.listId === list.id)
            };
          });
        // this.myBoard = { ...this.projectBoard, lists: mergedLists };
        this._changeDetectorRef.markForCheck();


    }

    onShowBacklog() {
        this.showBacklog = !this.showBacklog;
        this._localV2Service.setViewBacklog(this.showBacklog);
        this._localV2Service.setToStorage();        
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
     * Focus on the given element to start editing the list title
     *
     * @param listTitleInput
     */
    retitleList(listTitleInput: HTMLElement): void {
        // Use timeout so it can wait for menu to close
        setTimeout(() => {
            listTitleInput.focus();
        });
    }

    /**
     * Add new list
     *
     * @param title
     */
    addList(title: string): void {
        // Limit the max list count
        // if (this.projectBoard.lists.length >= this._maxListCount) {
        //     return;
        // }
        const projectList: ProjectList = ProjectListModel.emptyDto();
        projectList.boardId = this.projectBoard.id;
        projectList.position = this.projectLists.length
        ? this.projectLists[this.projectLists.length - 1].position +
          this._positionStep
        : this._positionStep;
        projectList.title = title;

        // Save the list
        this._projectsV2Service.createProjectList(projectList).subscribe();
    }

    /**
     * Update the list title
     *
     * @param event
     * @param list
     */
    updateListTitle(event: any, list: ProjectList): void {
        // Get the target element
        const element: HTMLInputElement = event.target;

        // Get the new title
        const newTitle = element.value;

        // If the title is empty...
        if (!newTitle || newTitle.trim() === '') {
            // Reset to original title and return
            element.value = list.title;
            return;
        }

        // Update the list title and element value
        list.title = element.value = newTitle.trim();

        // Update the list
        this._projectsV2Service.updateProjectList(list.id, list).subscribe();
    }

    /**
     * Delete the list
     *
     * @param id
     */
    deleteList(id): void {
        // Open the confirmation dialog
        const confirmation = this._davesaConfirmationService.open({
            title: 'Delete list',
            message:
                'Are you sure you want to delete this list and its cards? This action cannot be undone!',
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
                // Delete the list
                this._projectsV2Service.deleteProjectList(id).subscribe();
            }
        });
    }

    /**
     * Add new card
     */
    addProjectCard(projectList: ProjectList, projectCard: ProjectCard): void {                        
        // Save the card
        projectCard.boardId = this.projectBoard.id;
        projectCard.listId = projectList.id;
        projectCard.userId = this.loginUser.id;
        projectCard.sort = this.projectCards.length + 1;
        projectCard.position = this.projectCards.length
        projectCard.position = this.projectCards.length
        ? this.projectCards[this.projectCards.length - 1].position +
            this._positionStep
        : this._positionStep;


        this._projectsV2Service.createProjectCard(projectCard).pipe(
            switchMap((res) => {
                return this._projectsV2Service.updateProjectList(projectList.id, projectList).pipe(
                    map((res: ProjectList) => {
                                const idxProjectList = this.projectLists.findIndex((list) => list.id === projectList.id);
                                this.projectLists[idxProjectList] = res;
                                this.ngOnInit();
                                return res;
                            })
                        );
                    })
        ).subscribe();
    }

    /**
     * List dropped
     *
     * @param event
     */
    listDropped(event: CdkDragDrop<ProjectList[]>): void {
        // Move the item
        moveItemInArray(    
            event.container.data,
            event.previousIndex,
            event.currentIndex
        );

        // Calculate the positions
        const updated = this._calculatePositions(event);

        // Update the lists
        updated.forEach(async (list) => {
            await this._projectsV2Service.updateProjectList(list.id, list).subscribe();
        });
        this.ngOnInit();

    }

    /**
     * Card dropped
     *
     * @param event
     */
    cardDropped(event: CdkDragDrop<ProjectCard[]>): void {    
        // Move or transfer the item
        if (event.previousContainer === event.container) {
            // Move the item
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            // Transfer the item
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );

            // Update the card's list it
            event.container.data[event.currentIndex].listId =
            event.container.id;

            this.ngOnInit();
        }

        // Calculate the positions
        const updated = this._calculatePositions(event);
        let datetime: any = new Date().toISOString();
        const testLog: ProjectLog = ProjectCardModel.testLogDto();
        testLog.sort = updated[0].testLog.length ? updated[0].testLog.length : 0;        
        testLog.boardId = updated[0].boardId;
        testLog.cardId = updated[0].id;
        testLog.title = updated[0].title;
        testLog.logAt = datetime;
        testLog.logBy = this.loginUser.id;
        const listFrom = this.projectLists.find((list) => list.id === event.previousContainer.id);
        const listTo = this.projectLists.find((list) => list.id === event.container.id);
        testLog.listFrom = listFrom.title;
        testLog.listTo = listTo.title;
        updated[0].testLog.push(testLog);
        // Update the cards
        updated.forEach(async (card) => {
            await this._projectsV2Service.updateProjectCard(card.id, card).subscribe();
        });

        this.ngOnInit();


    }

    /**
     * Check if the given ISO_8601 date string is overdue
     *
     * @param date
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
     * Calculate and set item positions
     * from given CdkDragDrop event
     *
     * @param event
     * @private
     */
    private _calculatePositions(event: CdkDragDrop<any[]>): any[] {
        // Get the items
        let items = event.container.data;
        const currentItem = items[event.currentIndex];
        const prevItem = items[event.currentIndex - 1] || null;
        const nextItem = items[event.currentIndex + 1] || null;

        // If the item moved to the top...
        if (!prevItem) {
            // If the item moved to an empty container
            if (!nextItem) {
                currentItem.position = this._positionStep;
            } else {
                currentItem.position = nextItem.position / 2;
            }
        }
        // If the item moved to the bottom...
        else if (!nextItem) {
            currentItem.position = prevItem.position + this._positionStep;
        }
        // If the item moved in between other items...
        else {
            currentItem.position = (prevItem.position + nextItem.position) / 2;
        }

        // Check if all item positions need to be updated
        if (
            !Number.isInteger(currentItem.position) ||
            currentItem.position >= this._maxPosition
        ) {
            // Re-calculate all orders
            items = items.map((value, index) => {
                value.position = (index + 1) * this._positionStep;
                return value;
            });

            // Return items
            return items;
        }

        // Return currentItem
        return [currentItem];
    }

    setFile(file): void { // Add type for clarity
        const updatedProject = { ...this.projectBoard,  ...file}; // Create a shallow copy
        this._projectsV2Service.updateProjectBoard(updatedProject.id, updatedProject).subscribe((resProject) => {
            this.projectBoard = resProject;
        });
      }

    onOptionSelected(event: any) {

    }

    onSaveCard(card: ProjectCard) {
        this._projectsV2Service.updateProjectCard(card.id, card).subscribe(() => 
            this.ngOnInit()
        );
    }


    onDeleteCard(id: string) {
        this._projectsV2Service.deleteProjectCard(id).subscribe(() => 
            this.ngOnInit()
        );
    }

    importSupportTickets() {
        this._projectsV2Service.importSupportTickets().subscribe(() => {
            this.ngOnInit();
        });

    }

    updateSupportTickets() {
        this._projectsV2Service.updateSupportTickets().subscribe(() => {
            this.ngOnInit();
        });

    }
}

