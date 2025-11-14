import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    BehaviorSubject,
    Observable,
    map,
    of,
    switchMap,
    take,
    tap,
    throwError,
} from 'rxjs';
import { EmailCategory, EmailFilter, EmailFolder, EmailLabel } from './emailbox.types';
import { Email } from 'app/core/services/data-services/emails/emails.model';

@Injectable({ providedIn: 'root' })
export class MailboxService {
    selectedMailChanged: BehaviorSubject<any> = new BehaviorSubject(null);
    private _category: BehaviorSubject<EmailCategory> = new BehaviorSubject(
        null
    );
    private _filters: BehaviorSubject<EmailFilter[]> = new BehaviorSubject(null);
    private _folders: BehaviorSubject<EmailFolder[]> = new BehaviorSubject(null);
    private _labels: BehaviorSubject<EmailLabel[]> = new BehaviorSubject(null);
    private _emails: BehaviorSubject<Email[]> = new BehaviorSubject(null);
    private _mailsLoading: BehaviorSubject<boolean> = new BehaviorSubject(
        false
    );
    private _email: BehaviorSubject<Email> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for category
     */
    get category$(): Observable<EmailCategory> {
        return this._category.asObservable();
    }

    /**
     * Getter for filters
     */
    get filters$(): Observable<EmailFilter[]> {
        return this._filters.asObservable();
    }

    /**
     * Getter for folders
     */
    get folders$(): Observable<EmailFolder[]> {
        return this._folders.asObservable();
    }

    /**
     * Getter for labels
     */
    get labels$(): Observable<EmailLabel[]> {
        return this._labels.asObservable();
    }

    /**
     * Getter for mails
     */
    get mails$(): Observable<Email[]> {
        return this._emails.asObservable();
    }

    /**
     * Getter for mails loading
     */
    get mailsLoading$(): Observable<boolean> {
        return this._mailsLoading.asObservable();
    }

    /**
     * Getter for mail
     */
    get mail$(): Observable<Email> {
        return this._email.asObservable();
    }

    /**
     * Getter for pagination
     */
    get pagination$(): Observable<any> {
        return this._pagination.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get filters
     */
    getFilters(): Observable<any> {
        return this._httpClient
            .get<EmailFilter[]>('api/crm/emailbox/filters')
            .pipe(
                tap((response: any) => {
                    this._filters.next(response);
                })
            );
    }

    /**
     * Get folders
     */
    getFolders(): Observable<any> {
        return this._httpClient
            .get<EmailFolder[]>('api/crm/emailbox/folders')
            .pipe(
                tap((response: any) => {
                    this._folders.next(response);
                })
            );
    }

    /**
     * Get labels
     */
    getLabels(): Observable<any> {
        return this._httpClient
            .get<EmailLabel[]>('api/crm/emailbox/labels')
            .pipe(
                tap((response: any) => {
                    this._labels.next(response);
                })
            );
    }

    /**
     * Get mails by filter
     */
    getMailsByFilter(filter: string, page: string = '1'): Observable<any> {
        // Execute the mails loading with true
        this._mailsLoading.next(true);

        return this._httpClient
            .get<Email[]>('api/crm/emailbox/mails', {
                params: {
                    filter,
                    page,
                },
            })
            .pipe(
                tap((response: any) => {
                    this._category.next({
                        type: 'filter',
                        name: filter,
                    });
                    this._emails.next(response.mails);
                    this._pagination.next(response.pagination);
                    this._mailsLoading.next(false);
                }),
                switchMap((response) => {
                    if (response.mails === null) {
                        return throwError({
                            message: 'Requested page is not available!',
                            pagination: response.pagination,
                        });
                    }

                    return of(response);
                })
            );
    }

    /**
     * Get mails by folder
     */
    getMailsByFolder(folder: string, page: string = '1'): Observable<any> {
        // Execute the mails loading with true
        this._mailsLoading.next(true);

        return this._httpClient
            .get<Email[]>('api/crm/emailbox/mails', {
                params: {
                    folder,
                    page,
                },
            })
            .pipe(
                tap((response: any) => {
                    this._category.next({
                        type: 'folder',
                        name: folder,
                    });
                    this._emails.next(response.mails);
                    this._pagination.next(response.pagination);
                    this._mailsLoading.next(false);
                }),
                switchMap((response) => {
                    if (response.mails === null) {
                        return throwError({
                            message: 'Requested page is not available!',
                            pagination: response.pagination,
                        });
                    }

                    return of(response);
                })
            );
    }

    /**
     * Get mails by label
     */
    getMailsByLabel(label: string, page: string = '1'): Observable<any> {
        // Execute the mails loading with true
        this._mailsLoading.next(true);

        return this._httpClient
            .get<Email[]>('api/crm/emailbox/mails', {
                params: {
                    label,
                    page,
                },
            })
            .pipe(
                tap((response: any) => {
                    this._category.next({
                        type: 'label',
                        name: label,
                    });
                    this._emails.next(response.mails);
                    this._pagination.next(response.pagination);
                    this._mailsLoading.next(false);
                }),
                switchMap((response) => {
                    if (response.mails === null) {
                        return throwError({
                            message: 'Requested page is not available!',
                            pagination: response.pagination,
                        });
                    }

                    return of(response);
                })
            );
    }

    /**
     * Get mail by id
     */
    getMailById(id: string): Observable<any> {
        return this._emails.pipe(
            take(1),
            map((mails) => {
                // Find the mail
                const mail = mails.find((item) => item.id === id) || null;

                // Update the mail
                this._email.next(mail);

                // Return the mail
                return mail;
            }),
            switchMap((mail) => {
                if (!mail) {
                    return throwError(
                        'Could not found mail with id of ' + id + '!'
                    );
                }

                return of(mail);
            })
        );
    }

    /**
     * Update mail
     *
     * @param id
     * @param mail
     */
    updateMail(id: string, mail: Email): Observable<any> {
        return this._httpClient
            .patch('api/crm/emailbox/mail', {
                id,
                mail,
            })
            .pipe(
                tap(() => {
                    // Re-fetch the folders on mail update
                    // to get the updated counts on the sidebar
                    this.getFolders().subscribe();
                })
            );
    }

    /**
     * Reset the current mail
     */
    resetMail(): Observable<boolean> {
        return of(true).pipe(
            take(1),
            tap(() => {
                this._email.next(null);
            })
        );
    }

    /**
     * Add label
     *
     * @param label
     */
    addLabel(label: EmailLabel): Observable<any> {
        return this.labels$.pipe(
            take(1),
            switchMap((labels) =>
                this._httpClient
                    .post<EmailLabel>('api/crm/emailbox/label', { label })
                    .pipe(
                        map((newLabel) => {
                            // Update the labels with the new label
                            this._labels.next([...labels, newLabel]);

                            // Return the new label
                            return newLabel;
                        })
                    )
            )
        );
    }

    /**
     * Update label
     *
     * @param id
     * @param label
     */
    updateLabel(id: string, label: EmailLabel): Observable<any> {
        return this.labels$.pipe(
            take(1),
            switchMap((labels) =>
                this._httpClient
                    .patch<EmailLabel>('api/crm/emailbox/label', {
                        id,
                        label,
                    })
                    .pipe(
                        map((updatedLabel: any) => {
                            // Find the index of the updated label within the labels
                            const index = labels.findIndex(
                                (item) => item.id === id
                            );

                            // Update the label
                            labels[index] = updatedLabel;

                            // Update the labels
                            this._labels.next(labels);

                            // Return the updated label
                            return updatedLabel;
                        })
                    )
            )
        );
    }

    /**
     * Delete label
     *
     * @param id
     */
    deleteLabel(id: string): Observable<any> {
        return this.labels$.pipe(
            take(1),
            switchMap((labels) =>
                this._httpClient
                    .delete('api/crm/emailbox/label', { params: { id } })
                    .pipe(
                        map((isDeleted: any) => {
                            // Find the index of the deleted label within the labels
                            const index = labels.findIndex(
                                (item) => item.id === id
                            );

                            // Delete the label
                            labels.splice(index, 1);

                            // Update the labels
                            this._labels.next(labels);

                            // Return the deleted status
                            return isDeleted;
                        })
                    )
            )
        );
    }
}
