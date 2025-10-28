import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { BrandsV2Service } from 'app/core/services/data-services/brands/brands-v2.service';
import { CategoriesV2Service } from 'app/core/services/data-services/cetagories/cetagories-v2.service';
import { GoodsV2Service } from 'app/core/services/data-services/goods/goods-v2.service';
import { GoodsComponent } from 'app/modules/axiomaim/jobjab/items/goods/goods.component';
import { GoodsService } from 'app/modules/axiomaim/jobjab/items/goods/goods.service';
import { GoodsListComponent } from 'app/modules/axiomaim/jobjab/items/goods/list/inventory.component';
import { VendorsV2Service } from 'app/core/services/data-services/vendors/vendors-v2.service';
import { TagsV2Service } from 'app/core/services/data-services/tags/tags-v2.service';

export default [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'inventory',
    },
    {
        path: 'inventory',
        component: GoodsComponent,
        children: [
            {
                path: '',
                component: GoodsListComponent,
                resolve: {
                    brands: () => inject(BrandsV2Service).getAll(),
                    categories: () => inject(GoodsV2Service).getCategories(),
                    goods: () => inject(GoodsV2Service).getAll(),
                    tags: () => inject(TagsV2Service).getAll(),
                    vendors: () => inject(VendorsV2Service).getAll(),
                },
            },
        ],
    },
] as Routes;
