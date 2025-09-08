import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class CategoryModel {

    constructor(
        id: string,
        sort: number,
        title: string,
        code: string,
        ) {
        this.id = id;
        this.sort = sort;
        this.title = title;
        this.code = code;
    }

    public id: string;
    public sort: number;
    public title: string;
    public code: string;

    public static emptyDto(): Category {
        return {
            id: uuidv4().toString(),
            sort: 1,
            title: null,
            code: null,
        }
    }

    public static toDto(dto: Category): Category {
            return {
                id: dto.id ? dto.id : uuidv4().toString(),
                sort: dto.sort ? dto.sort : 1,
                title: dto.title ? dto.title : null,
                code: dto.code ? dto.code : null,
            };
        }
    
}

export interface Category extends BaseDto {
    id: string;
    sort: number;
    title: string;
    code: string;
}






