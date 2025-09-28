import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    BillingCycle,
} from 'app/modules/axiomaim/services/subscriptions/billing-cycle.types';
import {
    BehaviorSubject,
    Observable,
    filter,
    map,
    of,
    switchMap,
    take,
    tap,
    throwError,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BillingCyclesService {
    // Private
    private _billingCycle: BehaviorSubject<BillingCycle | null> = new BehaviorSubject(
        null
    );
    private _billingCycles: BehaviorSubject<BillingCycle[] | null> = new BehaviorSubject(
        null
    );

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for billingCycle
     */
    get billingCycle$(): Observable<BillingCycle> {
        return this._billingCycle.asObservable();
    }

    /**
     * Getter for billingCycles
     */
    get billingCycles$(): Observable<BillingCycle[]> {
        return this._billingCycles.asObservable();
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get billing-cycles
     */
    getBillingCycles(): Observable<BillingCycle[]> {
        return this._httpClient.get<BillingCycle[]>('api/common/billing-cycles').pipe(
            tap((billingCycles) => {
                this._billingCycles.next(billingCycles);
            })
        );
    }

    /**
     * Search billing Cycles with given query
     *
     * @param query
     */
    searchBillingCycles(query: string): Observable<BillingCycle[]> {
        return this._httpClient
            .get<BillingCycle[]>('api/common/billing-cycles/search', {
                params: { query },
            })
            .pipe(
                tap((contacts) => {
                    this._billingCycles.next(contacts);
                })
            );
    }

    /**
     * Get contact by id
     */
    getBillingCycleById(id: string): Observable<BillingCycle> {
        return this._billingCycles.pipe(
            take(1),
            map((contacts) => {
                // Find the contact
                const contact = contacts.find((item) => item.id === id) || null;

                // Update the contact
                this._billingCycle.next(contact);

                // Return the contact
                return contact;
            }),
            switchMap((contact) => {
                if (!contact) {
                    return throwError(
                        'Could not found contact with id of ' + id + '!'
                    );
                }

                return of(contact);
            })
        );
    }

    /**
     * Create billing-cycle
     */
    createBillingCycle(): Observable<BillingCycle> {
        return this.billingCycles$.pipe(
            take(1),
            switchMap((contacts) =>
                this._httpClient
                    .post<BillingCycle>('api/common/billing-cycle', {})
                    .pipe(
                        map((newBillingCycle) => {
                            // Update the contacts with the new contact
                            this._billingCycles.next([newBillingCycle, ...contacts]);

                            // Return the new contact
                            return newBillingCycle;
                        })
                    )
            )
        );
    }


}
