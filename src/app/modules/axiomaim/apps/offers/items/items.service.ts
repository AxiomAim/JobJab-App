import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
    ItemsPagination,
} from 'app/modules/axiomaim/apps/offers/items/items-data/items-pagination.model';
import {
    ItemsOffer,
} from 'app/modules/axiomaim/apps/offers/items/items-data/items-offers.model';
import {
    ItemsBrand,
} from 'app/modules/axiomaim/apps/offers/items/items-data/items-brands.model';
import {
    ItemsCategory,
} from 'app/modules/axiomaim/apps/offers/items/items-data/items-categories.model';
import {
    ItemsTag,
} from 'app/modules/axiomaim/apps/offers/items/items-data/items-tags.model';
import {
    ItemsVendor,
} from 'app/modules/axiomaim/apps/offers/items/items-data/items-vendors.model';
import {
    BehaviorSubject,
    Observable,
    filter,
    from,
    map,
    of,
    switchMap,
    take,
    tap,
    throwError,
} from 'rxjs';
import { ItemsBrandsV2Service } from './items-data/items-brands-v2.service';
import { ItemsOffersV2Service } from './items-data/items-offers-v2.service';
import { ItemsCategoriesV2Service } from './items-data/items-categories-v2.service';
import { ItemsVendorsV2Service } from './items-data/items-vendors-v2.service';
import { ItemsTagsV2Service } from './items-data/items-tags-v2.service';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  _itemsOffersV2Service = inject(ItemsOffersV2Service);
  _itemsBrandsV2Service = inject(ItemsBrandsV2Service);
  _itemsCategoriesV2Service = inject(ItemsCategoriesV2Service);
  _itemsVendorsV2Service = inject(ItemsVendorsV2Service);
  _itemsTagsV2Service = inject(ItemsTagsV2Service);

  // Private
    private _brands: BehaviorSubject<ItemsBrand[] | null> =
        new BehaviorSubject(null);
    private _categories: BehaviorSubject<ItemsCategory[] | null> =
        new BehaviorSubject(null);
    private _pagination: BehaviorSubject<ItemsPagination | null> =
        new BehaviorSubject(null);
    private _offer: BehaviorSubject<ItemsOffer | null> =
        new BehaviorSubject(null);
    private _offers: BehaviorSubject<ItemsOffer[] | null> =
        new BehaviorSubject(null);
    private _tags: BehaviorSubject<ItemsTag[] | null> = new BehaviorSubject(
        null
    );
    private _vendors: BehaviorSubject<ItemsVendor[] | null> =
        new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for brands
     */
    get brands$(): Observable<ItemsBrand[]> {
        return this._brands.asObservable();
    }

    /**
     * Getter for categories
     */
    get categories$(): Observable<ItemsCategory[]> {
        return this._categories.asObservable();
    }

    /**
     * Getter for pagination
     */
    get pagination$(): Observable<ItemsPagination> {
        return this._pagination.asObservable();
    }

    /**
     * Getter for offer
     */
    get offer$(): Observable<ItemsOffer> {
        return this._offer.asObservable();
    }

    /**
     * Getter for offers
     */
    get offers$(): Observable<ItemsOffer[]> {
        return this._offers.asObservable();
    }

    /**
     * Getter for tags
     */
    get tags$(): Observable<ItemsTag[]> {
        return this._tags.asObservable();
    }

    /**
     * Getter for vendors
     */
    get vendors$(): Observable<ItemsVendor[]> {
        return this._vendors.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get brands
     */

    getBrands(): Observable<ItemsBrand[]> {
        return from(this._itemsBrandsV2Service.getAll()).pipe(
            tap((brands) => {
            this._brands.next(brands);
            })
        );
    }
    /**
     * Get categories
     */
    getCategories(): Observable<ItemsCategory[]> {
        return from(this._itemsCategoriesV2Service.getAll()).pipe(
            tap((categories) => {
                this._categories.next(categories);
            })
        );
    }

    /**
     * Get categories
     */
    getOffers(): Observable<ItemsOffer[]> {
        return from(this._itemsOffersV2Service.getAll()).pipe(
            tap((offers) => {
                this._offers.next(offers);
            })
        );
    }

    /**
     * Get offer by id
     */
    getOfferById(id: string): Observable<ItemsOffer> {
        return from(this._itemsOffersV2Service.getItem(id)).pipe(
            tap((offer) => {
                this._offer.next(offer);
            })
        );

    }

    /**
     * Create offer
     *
     * @param offer
     */
    createOffer(offer: ItemsOffer): Observable<ItemsOffer> {
        return from(this._itemsOffersV2Service.createItem(offer)).pipe(
            tap((newOffer: ItemsOffer) => {
            this._offers.next([...this._offers.value, newOffer]);
            })
        );
    }

    /**
     * Get categories
     */
    searchOffers(query: any): Observable<ItemsOffer[]> {
        return from(this._itemsOffersV2Service.search(query)).pipe(
            tap((offers) => {
                this._offers.next(offers);
            })
        );
    }

    /**
     * Update the offer
     *
     * @param id
     * @param offer
     */
    updateOffer(id: string, offer: ItemsOffer): Observable<ItemsOffer> {
        return from(this._itemsOffersV2Service.updateItem(offer)).pipe(
            tap((newOffer: ItemsOffer) => {
            const currentOffers = this._offers.value;
            const index = currentOffers.findIndex((item) => item.id === id);
            if (index !== -1) {
                const updatedOffers = [
                ...currentOffers.slice(0, index),
                newOffer,
                ...currentOffers.slice(index + 1)
                ];
                this._offers.next(updatedOffers);
            }
            })
        );
    }

    /**
     * Delete the offer
     *
     * @param id
     */
    deleteOffer(id: string): Observable<boolean> {
        return from(this._itemsOffersV2Service.deleteItem(id)).pipe(
            tap((success: boolean) => {
            if (success) {
                // Update offers: remove the offer ID from each offer's tags array
                const currentOffers = this._offers.value;
                currentOffers.forEach((offer) => {
                const offerTagIndex = offer.tags.findIndex((tag) => tag === id);
                if (offerTagIndex > -1) {
                    offer.tags.splice(offerTagIndex, 1);
                }
                });
                this._offers.next(currentOffers);
            }
            })
        );
    }


    /**
     * Get offers
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getProducts(
        page: number = 0,
        size: number = 10,
        sort: string = 'name',
        order: 'asc' | 'desc' | '' = 'asc',
        search: string = ''
    ): Observable<{
        pagination: ItemsPagination;
        offers: ItemsOffer[];
    }> {
        
        return this._httpClient
            .get<{
                pagination: ItemsPagination;
                offers: ItemsOffer[];
            }>('api/apps/ecommerce/inventory/offers', {
                params: {
                    page: '' + page,
                    size: '' + size,
                    sort,
                    order,
                    search,
                },
            })
            .pipe(
                tap((response) => {
                    this._pagination.next(response.pagination);
                    this._offers.next(response.offers);
                })
            );
    }

    /**
     * Get offer by id
     */
    getProductById(id: string): Observable<ItemsOffer> {
        return this._offers.pipe(
            take(1),
            map((offers) => {
                // Find the offer
                const offer = offers.find((item) => item.id === id) || null;

                // Update the offer
                this._offer.next(offer);

                // Return the offer
                return offer;
            }),
            switchMap((offer) => {
                if (!offer) {
                    return throwError(
                        'Could not found offer with id of ' + id + '!'
                    );
                }

                return of(offer);
            })
        );
    }

    /**
     * Create offer
     */
    createProduct(): Observable<ItemsOffer> {
        return this.offers$.pipe(
            take(1),
            switchMap((offers) =>
                this._httpClient
                    .post<ItemsOffer>(
                        'api/apps/ecommerce/inventory/offer',
                        {}
                    )
                    .pipe(
                        map((newProduct) => {
                            // Update the offers with the new offer
                            this._offers.next([newProduct, ...offers]);

                            // Return the new offer
                            return newProduct;
                        })
                    )
            )
        );
    }

    /**
     * Update offer
     *
     * @param id
     * @param offer
     */
    updateProduct(
        id: string,
        offer: ItemsOffer
    ): Observable<ItemsOffer> {
        return this.offers$.pipe(
            take(1),
            switchMap((offers) =>
                this._httpClient
                    .patch<ItemsOffer>(
                        'api/apps/ecommerce/inventory/offer',
                        {
                            id,
                            offer,
                        }
                    )
                    .pipe(
                        map((updatedProduct) => {
                            // Find the index of the updated offer
                            const index = offers.findIndex(
                                (item) => item.id === id
                            );

                            // Update the offer
                            offers[index] = updatedProduct;

                            // Update the offers
                            this._offers.next(offers);

                            // Return the updated offer
                            return updatedProduct;
                        }),
                        switchMap((updatedProduct) =>
                            this.offer$.pipe(
                                take(1),
                                filter((item) => item && item.id === id),
                                tap(() => {
                                    // Update the offer if it's selected
                                    this._offer.next(updatedProduct);

                                    // Return the updated offer
                                    return updatedProduct;
                                })
                            )
                        )
                    )
            )
        );
    }

    /**
     * Delete the offer
     *
     * @param id
     */
    deleteProduct(id: string): Observable<boolean> {
        return this.offers$.pipe(
            take(1),
            switchMap((offers) =>
                this._httpClient
                    .delete('api/apps/ecommerce/inventory/offer', {
                        params: { id },
                    })
                    .pipe(
                        map((isDeleted: boolean) => {
                            // Find the index of the deleted offer
                            const index = offers.findIndex(
                                (item) => item.id === id
                            );

                            // Delete the offer
                            offers.splice(index, 1);

                            // Update the offers
                            this._offers.next(offers);

                            // Return the deleted status
                            return isDeleted;
                        })
                    )
            )
        );
    }

    /**
     * Get tags
     */
    getTags(): Observable<ItemsTag[]> {
        return from(this._itemsTagsV2Service.getAll()).pipe(
            tap((tags) => {
                this._tags.next(tags);
            })
        );
    }

    /**
     * Create tag
     *
     * @param tag
     */
    createTag(tag: ItemsTag): Observable<ItemsTag> {
        return from(this._itemsTagsV2Service.createItem(tag)).pipe(
            tap((newTag: ItemsTag) => {
            this._tags.next([...this._tags.value, newTag]);
            })
        );
    }

    /**
     * Update the tag
     *
     * @param id
     * @param tag
     */
    updateTag(id: string, tag: ItemsTag): Observable<ItemsTag> {
        return from(this._itemsTagsV2Service.updateItem(tag)).pipe(
            tap((newTag: ItemsTag) => {
            const currentTags = this._tags.value;
            const index = currentTags.findIndex((item) => item.id === id);
            if (index !== -1) {
                const updatedTags = [
                ...currentTags.slice(0, index),
                newTag,
                ...currentTags.slice(index + 1)
                ];
                this._tags.next(updatedTags);
            }
            })
        );
    }

    /**
     * Delete the tag
     *
     * @param id
     */
    deleteTag(id: string): Observable<boolean> {
        return from(this._itemsTagsV2Service.deleteItem(id)).pipe(
            tap((success: boolean) => {
            if (success) {
                // Update tags: remove the deleted tag
                const currentTags = this._tags.value;
                const tagIndex = currentTags.findIndex((item) => item.id === id);
                if (tagIndex !== -1) {
                const updatedTags = [
                    ...currentTags.slice(0, tagIndex),
                    ...currentTags.slice(tagIndex + 1)
                ];
                this._tags.next(updatedTags);
                }

                // Update offers: remove the tag ID from each offer's tags array
                const currentOffers = this._offers.value;
                currentOffers.forEach((offer) => {
                const offerTagIndex = offer.tags.findIndex((tag) => tag === id);
                if (offerTagIndex > -1) {
                    offer.tags.splice(offerTagIndex, 1);
                }
                });
                this._offers.next(currentOffers);
            }
            })
        );
    }

    /**
     * Get vendors
     */
    getVendors(): Observable<ItemsVendor[]> {
        return from(this._itemsVendorsV2Service.getAll()).pipe(
            tap((vendors) => {
                this._vendors.next(vendors);
            })
        );
    }
}
