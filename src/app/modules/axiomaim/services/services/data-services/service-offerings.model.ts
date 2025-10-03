import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';
import { ServiceOfferingList } from './service-offerings-list.model';
import { Service } from './services.model';

export class ServiceOfferingModel implements BaseDto {
    constructor(
            id: string,
            orgId: string,
            title: string,
            description: string | null,
            icon: string | null,
            lastActivity: string | null,
            lists: ServiceOfferingList[],
        ) {
            this.id = id;
            this.orgId = orgId;
            this.title = title;
            this.description = description;
            this.icon = icon;
            this.lastActivity = lastActivity;
            this.lists = lists;
    }
    public id: string;
    public orgId: string;
    public title: string;
    public description: string | null;
    public icon: string | null;
    public lastActivity: string | null;
    public lists: ServiceOfferingList[];

    public static toDto(dto: ServiceOffering): ServiceOffering {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            title: dto.title ? dto.title : '',
            description: dto.description ? dto.description : null,
            icon: dto.icon ? dto.icon : 'mat_outline:miscellaneous_services',
            lastActivity: dto.lastActivity ? dto.lastActivity : null,
            lists: dto.lists ? dto.lists : [],
        };
    }

    public static emptyDto():ServiceOffering {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            title: '',
            description: null,
            icon: 'mat_outline:miscellaneous_services',
            lastActivity: date,
            lists: [],
        };
    }
}

export interface ServiceOffering  extends BaseDto {
    id: string;
    orgId: string;
    title: string;
    description: string | null;
    icon: string | null;
    lastActivity: string | null;
    lists: ServiceOfferingList[];
}

