import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';
import { Image } from 'app/core/models/image.model';

export class ItemsTagModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        title?: string,
        ) {
            this.id = id;
            this.orgId = orgId;
            this.title = title;
    }
    public id: string;
    public orgId: string;
    public title?: string;

    public static toDto(dto: ItemsTag): ItemsTag {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            title: dto.title ? dto.title : '',
        };
    }

    public static emptyDto():ItemsTag {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            title: '',
        }
    }
}

export interface ItemsTag extends BaseDto {
    id: string;
    orgId: string;
    title?: string;
}

