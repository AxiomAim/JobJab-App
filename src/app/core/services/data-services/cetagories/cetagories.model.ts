import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class CategoryModel {

    constructor(
        id: string,
        orgId: string,
        parentsId: string,
        name: string,
        slug: string,
        
        ) {
        this.id = id;
        this.orgId = orgId;
        this.parentId = parentsId;
        this.name = name;
        this.slug = slug;
    }

    public id: string;
    public orgId: string;
    public parentId: string;
    public name: string;
    public slug: string;



    public static emptyDto(): Category {
        return {
            id: uuidv4().toString(),
            orgId: null,
            parentId: null,
            name: '',
            slug: '',
        }
    }

    public static toDto(dto: Category): Category {
            return {
                id: dto.id ? dto.id : uuidv4().toString(),
                orgId: dto.orgId ? dto.orgId : null,
                parentId: dto.parentId ? dto.parentId : null,
                name: dto.name ? dto.name : '',
                slug: dto.slug ? dto.slug : '',
            };
        }
    
}

export interface Category extends BaseDto {
    id: string;
    orgId: string;
    parentId: string;
    name: string;
    slug: string;
}


