import { TextFieldModule } from '@angular/cdk/text-field';
import { DatePipe, NgClass } from '@angular/common';
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
import {
    Board,
    Card,
    Label,
} from 'app/modules/axiomaim/apps/scrumboard/scrumboard.models';
import { ScrumboardService } from 'app/modules/axiomaim/apps/scrumboard/scrumboard.service';
import { assign } from 'lodash-es';
import { DateTime } from 'luxon';
import { Subject, debounceTime, takeUntil, tap } from 'rxjs';
import { Option, Subscription } from '../../../subscriptions.model';
import { SubscriptionsV2Service } from '../../../subscriptions-v2.service';

@Component({
    selector: 'subscriptions-option-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
        NgClass,
        MatDatepickerModule,
        MatCheckboxModule,
        DatePipe,
    ],
})
export class SubscriptionsOptionDetailsComponent implements OnInit, OnDestroy {
    _subscriptionsV2Service = inject(SubscriptionsV2Service);
    @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
    subscription: Subscription;
    option: Option;
    optionForm: UntypedFormGroup;

    // Private
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<SubscriptionsOptionDetailsComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: UntypedFormBuilder,
        private _scrumboardService: ScrumboardService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the board
        // this._scrumboardService.board$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((board) => {
        //         // Board data
        //         this.subscription = board;

        //         // Get the labels
        //         this.labels = this.filteredLabels = board.labels;
        //     });

        // Get the card details
        // this._scrumboardService.card$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((card) => {
        //         this.option = card;
        //     });

        // Prepare the card form
        this.optionForm = this._formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            description: [''],
            quantity: [null],
            price: [null],
            billingCycle: [null],
        });        

        // Fill the form
        this.optionForm.setValue({
            id: this.option.id,
            name: this.option.name,
            description: this.option.description,
            quantity: this.option.quantity,
            price: this.option.price,
            billingCycle: this.option.billingCycle,
        });

        // Update card when there is a value change on the card form
        this.optionForm.valueChanges
            .pipe(
                tap((value) => {
                    // Update the card object
                    this.option = assign(this.option, value);
                }),
                debounceTime(300),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((value) => {
                // Update the card on the server
                this._scrumboardService.updateCard(value.id, value).subscribe();

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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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
