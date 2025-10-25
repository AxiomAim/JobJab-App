import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ItemsComponent } from 'app/modules/axiomaim/apps/offers/items/items.component';
import { ItemsService } from 'app/modules/axiomaim/apps/offers/items/items.service';
import { ItemsListComponent } from 'app/modules/axiomaim/apps/offers/items/list/list.component';

export default [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'inventory',
    },
    {
        path: 'items',
        component: ItemsComponent,
        children: [
            {
                path: '',
                component: ItemsListComponent,
                resolve: {
                    brands: () => inject(ItemsService).getBrands(),
                    categories: () => inject(ItemsService).getCategories(),
                    offers: () => inject(ItemsService).getOffers(),
                    tags: () => inject(ItemsService).getTags(),
                    vendors: () => inject(ItemsService).getVendors(),
                },
            },
        ],
    },
] as Routes;
