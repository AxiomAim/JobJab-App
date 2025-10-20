import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';
import { Image } from 'app/core/models/image.model';

export class ItemsCategoryModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        parentId: string,
        name: string,
        slug: string,
        ) {
            this.id = id;
            this.orgId = orgId;
            this.parentId = parentId;
            this.name = name;
            this.slug = slug;
    }
    public id: string;
    public orgId: string;
    public parentId: string;
    public name: string;
    public slug: string;

    public static toDto(dto: ItemsCategory): ItemsCategory {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            parentId: dto.parentId ? dto.parentId : '',
            name: dto.name ? dto.name : '',
            slug: dto.slug ? dto.slug : '',
        };
    }

    public static emptyDto():ItemsCategory {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            parentId: '',
            name: '',
            slug: '',
        }
    }
}

export interface ItemsCategory extends BaseDto {
    id: string;
    orgId: string;
    parentId: string;
    name: string;
    slug: string;
}

