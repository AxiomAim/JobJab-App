import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class TagModel {

    constructor(
        id: string,    
        title: string,
    ) {
        this.id = id;
        this.title = title;
    }

    public id: string;
    public title: string;

    public static emptyDto(): Tag {
        return {
            id: uuidv4().toString(),
            title: null,
        }
    }

    public static toDto(dto: Tag): Tag {
            return {
                id: dto.id ? dto.id : uuidv4().toString(),
                title: dto.title ? dto.title : null,
            };
        }
    
}

export interface Tag extends BaseDto {
    id: string,    
    title: string,
}




