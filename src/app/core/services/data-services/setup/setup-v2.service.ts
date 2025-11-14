import { createInjectable } from "ngxtension/create-injectable";
import { inject, forwardRef } from "@angular/core";  // Added forwardRef import
import { HttpClient } from "@angular/common/http";
import { firstValueFrom, switchMap, tap, catchError, forkJoin, of } from "rxjs";  // Added switchMap, catchError, forkJoin, of
import { Stage, StageModel } from "../stages/stages.model";
import { User } from "app/modules/axiomaim/administration/users/users.model";
import { StagesV2Service } from "../stages/stages-v2.service";

export const SetupV2Service = createInjectable(() => {
  const _httpClient = inject(HttpClient);
  // Fixed: Use forwardRef to break cycle (defers StagesV2Service resolution)
  const _stagesV2Service = inject(forwardRef(() => StagesV2Service));
  
  /**
   * Initialize setup (e.g., populate stages for new org/user)
   */
  const init = async (loginUser: User): Promise<void> => {
    try {
      // Uncommented and fixed: Call populateStages during init
      const createdStages = await populateStages(loginUser.orgId);
      console.log('createdStages', createdStages);
    } catch (error) {
      console.error('Setup init failed:', error);
      throw error;  // Or handle gracefully
    }
  };

  /**
   * Populate Stages from API and persist to Firestore
   */
  const populateStages = async (orgId: string): Promise<Stage[]> => {
    try {
      // Fixed: Use switchMap for async side-effects; chain properly
      // Fetch raw stages from API
      const rawStages$ = _httpClient.get<Stage[]>('api/setup/stages').pipe(
        catchError(error => {
          console.error('Failed to fetch setup stages:', error);
          return of([]);  // Graceful fallback
        })
      );

      // Transform and create in parallel (using forkJoin for efficiency)
      const populatedStages$ = rawStages$.pipe(
        switchMap(async (stages) => {
          if (stages.length === 0) return [];

          // Prepare create promises (parallel for speed)
          const createPromises = stages.map(stage => {
            const newStage: Stage = StageModel.emptyDto();
            newStage.orgId = orgId;
            newStage.name = stage.name;
            newStage.slug = stage.slug;
            newStage.percent = stage.percent;
            newStage.query = stage.query;
            newStage.quote = stage.quote;
            newStage.job = stage.job;
            newStage.invoice = stage.invoice;
            return _stagesV2Service.createItem(newStage);  // Returns Promise<Stage>
          });

          // Await all creates
          const createdStages = await forkJoin(createPromises).toPromise();  // Or firstValueFrom(forkJoin(...))
          
          // Optional: Refresh all stages post-create
          await _stagesV2Service.getAll();  // Await to ensure sync
          
          return createdStages;
        })
      );

      // Await and return populated stages
      return await firstValueFrom(populatedStages$);
    } catch (error) {
      console.error('Error populating stages:', error);
      throw error;
    }
  };

  return {
    init,
    populateStages,  // Exposed for testing/flexibility
  };
});