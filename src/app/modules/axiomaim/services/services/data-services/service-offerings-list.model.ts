import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';
import { Service } from './services.model';

export class ServiceOfferingListModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        serviceOfferingId: string,
        position: number,
        title: string,
        services?: Service[],
        ) {
            this.id = id;
            this.orgId = orgId;
            this.serviceOfferingId = serviceOfferingId;
            this.position = position;
            this.title = title;
            this.services = services;
    }
    public id: string;
    public orgId: string;
    public serviceOfferingId: string;
    public position: number;
    public title: string;
    public services?: Service[];



    public static toDto(dto: ServiceOfferingList): ServiceOfferingList {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            serviceOfferingId: dto.serviceOfferingId ? dto.serviceOfferingId : '',
            position: dto.position ? dto.position : 0,
            title: dto.title ? dto.title : '',
            services: dto.services ? dto.services : [],
        };
    }

    public static emptyDto():ServiceOfferingList {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            serviceOfferingId: '',
            position: 0,
            title: '',
            services: [],

        }
    }
}

export interface ServiceOfferingList extends BaseDto {
    id: string;
    orgId: string;
    serviceOfferingId: string;
    position: number;
    title: string;
    services?: Service[];
}

