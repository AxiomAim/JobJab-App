import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ProductsV2ApiService } from "./products-v2-api.service";
import { Product } from "./products.model";

const ALL_PRODUCTS = "allProducts";
const PRODUCTS = "products";
const PRODUCT = "product";
const LOGIN_PRODUCT = "loginProduct";


export const ProductsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _productsV2ApiService = inject(ProductsV2ApiService);
  const allProducts = signal<Product[] | null>(null);
  const products = signal<Product[] | null>(null);
  const product = signal<Product | null>(null);

  const getAll = async ():Promise<Product[]> => {
    const response = await _productsV2ApiService.getAll();
    allProducts.set(response);
    products.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Product> => {
    const response = await _productsV2ApiService.getItem(oid);
    product.set(response);
    return response;
  };

  const createItem = async (data: Product): Promise<Product> => {
    const response = await _productsV2ApiService.createItem(data);
    product.set(response);
    return response;
  };

  const updateItem = async (data: Product): Promise<Product> => {
    const response = await _productsV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _productsV2ApiService.deleteItem(oid);
    product.set(null);
    return response;
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allProducts().filter(
        (searchResults: any) =>
          searchResults.name &&
        searchResults.name.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
      products.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  return {
    products: computed(() => products()),
    allProducts: computed(() => allProducts()),
    product: computed(() => product()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
  };
});
