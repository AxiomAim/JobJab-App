import { CdkScrollable } from '@angular/cdk/scrolling';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Contact } from '../../crm/contacts/contacts.model';
import { ContactsService } from '../../apps/contacts/contacts.service';
import { Country } from '../../apps/contacts/contacts.types';
import { Subject, takeUntil } from 'rxjs';
import { ContactsAddItemComponent } from '../../crm/contacts/add-item/add-item.component';
import { SelectContactComponent } from 'app/layout/common/select-contact/select-contact.component';

@Component({
    selector: 'quote',
    templateUrl: './quote.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatIconModule, 
        RouterLink, 
        MatButtonModule, 
        CdkScrollable,
        SelectContactComponent,
        ContactsAddItemComponent
    ],
})
export class QuoteComponent implements OnInit, AfterViewInit, OnDestroy {
    public contact: Contact;
    public countries: Country[] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _contactsService: ContactsService,
        private _changeDetectorRef: ChangeDetectorRef,

    ) {

    }
    async ngOnInit() {
        this.contact = null;
        await this._contactsService.countries$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((codes: Country[]) => {
                this.countries = codes;
                console.log('this.countries', this.countries);
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    ngAfterViewInit(): void {
    }

    ngOnDestroy(): void {
    }

    setContact(event: any) {
        this.contact = event;
        // console.log('Contact created event received in QuoteComponent:', event);
    }

    /**
     * Get country info by iso code
     *
     * @param iso
     */
    getCountryByIso(iso: string): Country {
        const response = this.countries.find((country) => country.iso === iso);
        return response;
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
