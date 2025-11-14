import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom, tap } from "rxjs";
import { StagesV2Service } from "../stages/stages-v2.service";
import { Stage, StageModel } from "../stages/stages.model";
import { User } from "app/modules/axiomaim/administration/users/users.model";

export const SetupV2Service = createInjectable(() => {
  const _httpClient = inject(HttpClient);
  const _stagesV2Service = inject(StagesV2Service);
  
    /**
     * Populate Stages
     */
    const init = async (loginUser: User) => {
      const stages = await populateStages(loginUser.orgId);
    }


    /**
     * Populate Stages
     */
    const populateStages = async (orgId): Promise<Stage[]> => {
      const allStages = _httpClient
          .get<Stage[]>('api/setup/stages')
          .pipe(
              tap(async (stages) => {
                stages.forEach(stage => {
                  const newStage: Stage = StageModel.emptyDto();
                  newStage.orgId = orgId;
                  newStage.name = stage.name;
                  newStage.slug = stage.slug;
                  newStage.percent = stage.percent;
                  newStage.query = stage.query;
                  newStage.quote = stage.quote;
                  newStage.job = stage.job;
                  newStage.invoice = stage.invoice; 
                  _stagesV2Service.createItem(newStage);
                });
                _stagesV2Service.getAll()
                return _stagesV2Service.stages()
              })
          );
      return await firstValueFrom(allStages)        
    }
  

  return {
    init,
  };
});
