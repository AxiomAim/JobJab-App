import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class TagModel {

    constructor(
        id: string,
        orgId: string,
        title: string,
        slug: string,
        
        ) {
        this.id = id;
        this.orgId = orgId;
        this.title = title;
        this.slug = slug;

    }

    public id: string;
    public orgId: string;
    public title: string;
    public slug: string;


    public static emptyDto(): Tag {
        return {
            id: uuidv4().toString(),
            orgId: null,
            title: '',
            slug: '',
        }
    }

    public static toDto(dto: Tag): Tag {
            return {
                id: dto.id ? dto.id : uuidv4().toString(),
                orgId: dto.orgId ? dto.orgId : null,
                title: dto.title ? dto.title : '',
                slug: dto.slug ? dto.slug : '',
            };
        }
    
}

export interface Tag extends BaseDto {
    id: string;
    orgId: string;
    title: string;
    slug: string;
}


