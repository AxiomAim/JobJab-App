import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Good } from "./goods.model";
import { GoodsApiV2Service } from "./goods-v2-api.service";
import { Category } from "app/core/models/categories.model";
import { firstValueFrom, tap } from "rxjs";

export const GoodsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _goodsApiV2Service = inject(GoodsApiV2Service);
  const allGoods = signal<Good[] | null>(null);
  const goods = signal<Good[] | null>(null);
  const good = signal<Good | null>(null);
  const categories = signal<Category[] | null>(null);

  
  const getAll = async ():Promise<Good[]> => {
    const response = await _goodsApiV2Service.getAll();
    allGoods.set(response);
    goods.set(response);
    return response;
  };

  const getAllUserAppomitments = async ():Promise<Good[]> => {
    const response = await _goodsApiV2Service.getAll();
    allGoods.set(response);
    goods.set(response);
    return response;
  };


  const getItem = async (oid: string): Promise<Good> => {
    const response = await _goodsApiV2Service.getItem(oid);
    good.set(response);
    return response;
  };

  const createItem = async (data: Good): Promise<Good> => {
    const response = await _goodsApiV2Service.createItem(data);
    good.set(response);
    return response;
  };

  const updateItem = async (data: Good): Promise<Good> => {
    const response = await _goodsApiV2Service.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _goodsApiV2Service.deleteItem(oid);
    good.set(null);
    return response;
  };

  const setContact = async (thisContact: Good): Promise<Good> => {
    good.set(thisContact);
    return good();
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allGoods().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      goods.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  /**
   * Get categories
   */
  const getCategories = async (): Promise<Category[]> => {
    const allPhoneLabels = await _httpClient
        .get<Category[]>('api/common/categories')
        .pipe(
            tap((categoriesRes: Category[]) => {
              categories.set(categoriesRes);
              return categoriesRes;
            })
        );
        // return null;
    return await firstValueFrom(allPhoneLabels)        
  }

    
  return {
    goods: computed(() => goods()),
    allGoods: computed(() => allGoods()),
    good: computed(() => good()),
    categories: computed(() => categories()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    setContact,
    getAllUserAppomitments,
    getCategories
  };
});
