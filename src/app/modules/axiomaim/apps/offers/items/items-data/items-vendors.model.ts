import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';
import { Image } from 'app/core/models/image.model';

export class ItemsVendorModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        name: string,
        slug: string,

        ) {
            this.id = id;
            this.orgId = orgId;
            this.name = name;
            this.slug = slug;
        }
    public id: string;
    public orgId: string;
    public name: string;
    public slug: string;

    public static toDto(dto: ItemsVendor): ItemsVendor {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            name: dto.name ? dto.name : '',
            slug: dto.slug ? dto.slug : '',
        };
    }

    public static emptyDto():ItemsVendor {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            name: '',
            slug: '',
        }
    }
}

export interface ItemsVendor extends BaseDto {
    id: string;
    orgId: string;
    name: string;
    slug: string;
}

