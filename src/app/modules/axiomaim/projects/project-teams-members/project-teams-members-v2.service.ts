import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ProjectTeamsMembersV2ApiService } from "./project-teams-members-v2-api.service";
import { ProjectTeamMember } from "./project-teams-members.model";

const ALL_PRODUCTS = "allProducts";
const PRODUCTS = "products";
const PRODUCT = "product";
const LOGIN_PRODUCT = "loginProduct";


export const ProjectTeamsMembersV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _productsV2ApiService = inject(ProjectTeamsMembersV2ApiService);
  const allProducts = signal<ProjectTeamMember[] | null>(null);
  const products = signal<ProjectTeamMember[] | null>(null);
  const product = signal<ProjectTeamMember | null>(null);

  const getAll = async ():Promise<ProjectTeamMember[]> => {
    const response = await _productsV2ApiService.getAll();
    allProducts.set(response);
    products.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<ProjectTeamMember> => {
    const response = await _productsV2ApiService.getItem(oid);
    product.set(response);
    return response;
  };

  const createItem = async (data: ProjectTeamMember): Promise<ProjectTeamMember> => {
    const response = await _productsV2ApiService.createItem(data);
    product.set(response);
    return response;
  };

  const updateItem = async (data: ProjectTeamMember): Promise<ProjectTeamMember> => {
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
