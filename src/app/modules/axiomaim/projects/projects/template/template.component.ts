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
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DavesaConfirmationService } from '@davesa/services/confirmation';
import { DateTime } from 'luxon';
import { BehaviorSubject, map, Observable, Subject, switchMap, take, takeUntil } from 'rxjs';
import { User } from 'app/modules/davesa/administration/users/user.model';
import { Organization } from 'app/modules/davesa/administration/organizations/organizations.model';
import { ProtocolsBoardAddListComponent } from './add-list/add-list.component';
import { ProtocolsBoardAddCardComponent } from './add-card/add-card.component';
import { SortByIndexPipe } from '@davesa/pipes/sortByIndex.pipe';
import { MatDividerModule } from '@angular/material/divider';
import { ProtocolsV2TemplatesService } from '../ProtocolsV2Template.service';
import { v4 as uuidv4 } from 'uuid';
import { Protocol } from '../project.model';
import { MatDialog } from '@angular/material/dialog';
import { ProtocolsTemplateAddBoardComponent } from './add-board/add-board.component';
import { TBoard, TCard, TList } from '../project-template.model';

@Component({
    selector: 'protocols-template',
    templateUrl: './template.component.html',
    styleUrls: ['./template.component.scss'],
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
        NgClass,
        ProtocolsBoardAddCardComponent,
        ProtocolsBoardAddListComponent,
        RouterOutlet,
        DatePipe,
        NgIf,
        SortByIndexPipe,
        MatDividerModule,
    ],
    providers: [
        SortByIndexPipe,
    ],
})
export class ProtocolsTemplateComponent implements OnInit, OnDestroy {
    _protocolsV2TemplatesService = inject(ProtocolsV2TemplatesService);
    matDialog = inject(MatDialog);
    
    // myBoard: any;
    protocol: Protocol;
    board: TBoard;


    protocolLists: TList[] = [];
    protocolCards: TCard[] = [];
    listTitleForm: UntypedFormGroup;
    loginUser: User;
    organization: Organization

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
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        console.log('ProtocolsTemplateComponent')
        this.loginUser = this._protocolsV2TemplatesService.loginUser();
        this.organization = this._protocolsV2TemplatesService.organization();
        this.protocol = this._protocolsV2TemplatesService.protocol();
        this.board = this._protocolsV2TemplatesService.board();
        console.log('protocol', this.protocol)
        console.log('board', this.board)
        

        if(this.protocol.templateId) {
            this.matDialog.open(ProtocolsTemplateAddBoardComponent, {
                data: this.protocol,
              });
              this.matDialog.afterAllClosed.subscribe((data: any) => {
                this.protocol.templateId = data.templateId;
            });
        }
        this.board = this._protocolsV2TemplatesService.board();
        // this.protocolLists = this._protocolsV2TemplatesService.protocolLists();
        // this.protocolCards = this._protocolsV2TemplatesService.protocolCards();

        const mergedLists = this.protocolLists.map(list => {
            return {
              ...list,
              cards: this.protocolCards.filter(card => card.listId === list.id)
            };
          });

        this._changeDetectorRef.markForCheck();


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
        const protocolList: TList = {} as TList;
        protocolList.id = uuidv4().toString(),        
        protocolList.boardId = this.board.id;
        protocolList.orgId = this.organization.id;
        protocolList.userId = this.loginUser.id;
        protocolList.position = this.board.lists.length
        ? this.board.lists[this.board.lists.length - 1].position +
          this._positionStep
        : this._positionStep;
        protocolList.title = title;

        this.board.lists.push(protocolList);
    }

    /**
     * Update the list title
     *
     * @param event
     * @param list
     */
    updateListTitle(event: any, list: TList): void {
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
        this.board.lists = this.board.lists.map((l) =>
            l.id === list.id ? list : l
        );
    }

    updateList(list: TList): void {
        const idx = this.board.lists.findIndex((item) => item.id === list.id);
        this.board.lists[idx] = list;
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
                // Find the index of the deleted user
                const idx = this.board.lists.findIndex((item) => item.id === id);

                // Delete the user
                const deletedLists = this.board.lists.splice(idx, 1)[0];
            }
        });
    }

    /**
     * Add new card
     */
    addProtocolCard(list: TList, protocolCard: TCard): void {                        
        // Save the card
        protocolCard.boardId = this.board.id;
        protocolCard.listId = list.id;
        protocolCard.sort = this.protocolCards.length + 1;
        protocolCard.position = this.protocolCards.length
        ? this.protocolCards[this.protocolCards.length - 1].position +
            this._positionStep
        : this._positionStep;

        this.board.lists.push(list);

    }

    /**
     * List dropped
     *
     * @param event
     */
    listDropped(event: CdkDragDrop<TList[]>): void {
        // Move the item
        moveItemInArray(
            event.container.data,
            event.previousIndex,
            event.currentIndex
        );

        // Calculate the positions
        const updated = this._calculatePositions(event);

        // Update the lists
        updated.forEach((list) => {            
            this.updateList(list);
        });
        this.ngOnInit();

    }

    /**
     * Card dropped
     *
     * @param event
     */
    cardDropped(event: CdkDragDrop<TCard[]>): void {
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
        }

        // Calculate the positions
        const updated = this._calculatePositions(event);
        // console.log('updatedCards', updated)
        // Update the cards
        updated.forEach(async (card) => {
            await this.updateCard(card);
        });

        this.ngOnInit();


    }

    updateCard(card: TCard): void {
        const idx = this.protocolCards.findIndex((item) => item.id === card.id);
        this.protocolCards[idx] = card;
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

    manageLabels() {

        
    }
}
