import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class ImageModel {

    constructor(
        id: string,
        orgId: string,
        sort: number,
        title: string,
        source: string,
        ) {
        this.id = id;
        this.orgId = orgId;
        this.sort = sort;
        this.title = title;
        this.source = source;
    }

    public id: string;
    public orgId: string;
    public sort: number;
    public title: string;
    public source: string;

    public static emptyDto(): Image {
        return {
            id: uuidv4().toString(),
            orgId: null,
            sort: 1,
            title: null,
            source: null,
        }
    }

    public static toDto(dto: Image): Image {
            return {
                id: dto.id ? dto.id : uuidv4().toString(),
                orgId: dto.orgId ? dto.orgId : null,
                sort: dto.sort ? dto.sort : 1,
                title: dto.title ? dto.title : null,
                source: dto.source ? dto.source : null,
            };
        }
    
}

export interface Image extends BaseDto {
    id: string;
    orgId: string;
    sort: number;
    title: string;
    source: string;
}






