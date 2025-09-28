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
import { DatePipe, NgClass } from '@angular/common';
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
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AxiomaimConfirmationService } from '@axiomaim/services/confirmation';
import {
    Board,
    Card,
    List,
} from 'app/modules/axiomaim/apps/scrumboard/scrumboard.models';
import { ScrumboardService } from 'app/modules/axiomaim/apps/scrumboard/scrumboard.service';
import { DateTime } from 'luxon';
import { Subject, takeUntil } from 'rxjs';
import { ScrumboardBoardAddCardComponent } from './add-card/add-card.component';
import { ScrumboardBoardAddListComponent } from './add-list/add-list.component';
import { ServiceOfferingsV2Service } from '../date-services/service-offerings-v2.service';
import { ServiceOffering } from '../date-services/service-offerings.model';
import { ServiceOfferingListV2Service } from '../date-services/service-offerings-list-v2.service';
import { ServiceOfferingList, ServiceOfferingListModel } from '../date-services/service-offerings-list.model';
import { ServicesV2Service } from '../date-services/services-v2.service';
import { ServicesEditItemComponent } from '../edit-item/edit-item.component';
import { Service } from '../date-services/services.model';
import { ServicesAddServiceComponent } from './add-service/add-service.component';

@Component({
    selector: 'scrumboard-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
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
        ScrumboardBoardAddCardComponent,
        ScrumboardBoardAddListComponent,
        RouterOutlet,
        DatePipe,
        ServicesEditItemComponent,
        ServicesAddServiceComponent
    ],
})
export class ServiceOfferingBoardComponent implements OnInit, OnDestroy {
    public _serviceOfferingsV2Service = inject(ServiceOfferingsV2Service);
    public _serviceOfferingListV2Service = inject(ServiceOfferingListV2Service);
    public _servicesV2Service = inject(ServicesV2Service);
    serviceOffering: ServiceOffering;
    serviceOfferingList: ServiceOfferingList[];
    services: Service[];
    listTitleForm: UntypedFormGroup;
    serviceOfferingListCount: number = 0;

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
        private _axiomaimConfirmationService: AxiomaimConfirmationService,
        private _scrumboardService: ScrumboardService,
        private _router: Router

    ) {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // this.serviceOffering = this._serviceOfferingsV2Service.serviceOffering();
        // console.log('Service Offering', this.serviceOffering);        
        // this.serviceOfferingList = this._serviceOfferingListV2Service.serviceOfferingList();
        // console.log('Service Offering List', this._serviceOfferingListV2Service.serviceOfferingList());
        // this.serviceOfferingListCount = this._serviceOfferingListV2Service.serviceOfferingList().length;
        // console.log('Service Offering List Count', this.serviceOfferingListCount);
        // this.services = this._servicesV2Service.services();

        // Initialize the list title form
        this.listTitleForm = this._formBuilder.group({
            title: [''],
        });



        // Get the board
        // this._scrumboardService.board$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((board: Board) => {
        //         this.board = { ...board };

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });
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
    renameList(listTitleInput: HTMLElement): void {
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
    async addList(title: string) {
        // Limit the max list count
        // if (this.serviceOfferingList.length >= this._maxListCount) {
        //     return;
        // }

        // Create a new list model
        const list = new List({
            boardId: this.serviceOffering.id,
            position: this.serviceOffering.lists.length
                ? this.serviceOffering.lists[this.serviceOffering.lists.length - 1].position +
                  this._positionStep
                : this._positionStep,
            title: title,
        });

        // Save the list
        let newList: ServiceOfferingList = ServiceOfferingListModel.emptyDto();
        newList.serviceOfferingId = this.serviceOffering.id;
        newList.position = list.position;
        newList.title = list.title;
        this.serviceOffering.lists.push(newList);
        this._changeDetectorRef.markForCheck();
        await this._serviceOfferingListV2Service.createItem(newList);
        await this._serviceOfferingsV2Service.getAll();
        await this._serviceOfferingListV2Service.getAll();
    }

    /**
     * Update the list title
     *
     * @param event
     * @param list
     */
    updateListTitle(event: any, list: List): void {
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
        this._scrumboardService.updateList(list).subscribe();
    }


    /**
     * Delete the item
     *
     * @param id
     */
    /**
     * Delete the item
     */
    async deleteItem(id: string) {
        // Open the confirmation dialog
        const confirmation = this._axiomaimConfirmationService.open({
            title: 'Delete this Service Offering',
            message:
                'Are you sure you want to delete this service offering? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe(async (result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                // Get the current contact's id
                const id = this._serviceOfferingsV2Service.serviceOffering().id;


                // Delete the item
                try {
                    await this._serviceOfferingsV2Service.deleteItem(id);
                    // await this._serviceOfferingsV2Service.getAll();
                    this._router.navigate(['/administration/services']);

                } catch(err) {
                    this._router.navigate(['/administration/services']);

                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });
    }

    /**
     * Delete the list
     *
     * @param id
     */
    /**
     * Delete the list tiem
     */
    deleteList(id): void {
        // Open the confirmation dialog
        const confirmation = this._axiomaimConfirmationService.open({
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
                this._scrumboardService.deleteList(id).subscribe();
            }
        });
    }

    /**
     * Add new card
     */
    addCard(list: List, title: string): void {
        // Create a new card model
        const card = new Card({
            boardId: this.serviceOffering.id,
            listId: list.id,
            position: list.cards.length
                ? list.cards[list.cards.length - 1].position +
                  this._positionStep
                : this._positionStep,
            title: title,
        });

        // Save the card
        this._scrumboardService.createCard(card).subscribe();
    }

    addService(list: List, title: string): void {
        // Create a new card model
        const card = new Card({
            boardId: this.serviceOffering.id,
            listId: list.id,
            position: list.cards.length
                ? list.cards[list.cards.length - 1].position +
                  this._positionStep
                : this._positionStep,
            title: title,
        });

        // Save the card
        this._scrumboardService.createCard(card).subscribe();
    }

    /**
     * List dropped
     *
     * @param event
     */
    listDropped(event: CdkDragDrop<List[]>): void {
        // Move the item
        moveItemInArray(
            event.container.data,
            event.previousIndex,
            event.currentIndex
        );

        // Calculate the positions
        const updated = this._calculatePositions(event);

        // Update the lists
        this._scrumboardService.updateLists(updated).subscribe();
    }

    /**
     * Card dropped
     *
     * @param event
     */
    cardDropped(event: CdkDragDrop<Card[]>): void {
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

        // Update the cards
        this._scrumboardService.updateCards(updated).subscribe();
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
}
