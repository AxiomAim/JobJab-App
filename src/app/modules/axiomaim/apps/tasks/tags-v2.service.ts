import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Tag, TagModel } from "./tags.model";
import { TagsV2ApiService } from "./tags-v2-api.service";

export const TagsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _tagsV2ApiService = inject(TagsV2ApiService);
  const allTags = signal<Tag[] | null>(null);
  const tags = signal<Tag[] | null>(null);
  const tag = signal<Tag | null>(null);

  
  const getAll = async ():Promise<Tag[]> => {
    const response = await _tagsV2ApiService.getAll();
    allTags.set(response);
    tags.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Tag> => {
    const response = await _tagsV2ApiService.getItem(oid);
    tag.set(response);
    return response;
  };

  const createItem = async (data: Tag): Promise<Tag> => {
    const response = await _tagsV2ApiService.createItem(data);
    tag.set(response);
    return response;
  };

  const updateItem = async (data: Tag): Promise<Tag> => {
    const response = await _tagsV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _tagsV2ApiService.deleteItem(oid);
    tag.set(null);
    return response;
  };

  const setContact = async (thisContact: Tag): Promise<Tag> => {
    tag.set(thisContact);
    return tag();
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allTags().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      tags.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  
  return {
    tags: computed(() => tags()),
    allTags: computed(() => allTags()),
    tag: computed(() => tag()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    setContact,
  };
});
