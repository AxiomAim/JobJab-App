import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class SourceModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        name: string,
        description: string,
        background: string,
        createdAt?: string,
        updatedAt?: string,
        deletedAt?: string,
        ) {
            this.id = id;
            this.orgId = orgId;
            this.name = name;
            this.description = description;
            this.background = background;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.deletedAt = deletedAt;
    }
    public id: string;
    public orgId: string;
    public name: string;
    public description: string;
    public background: string;
    public createdAt?: string;
    public updatedAt?: string;
    public deletedAt?: string;

    public static toDto(dto: Source): Source {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            name: dto.name ? dto.name : '',
            description: dto.description ? dto.description : '',
            background: dto.background ? dto.background : 'images/backgrounds/jobjab_sources.jpg',
            createdAt: dto.createdAt ? dto.createdAt : '',
            updatedAt: dto.updatedAt ? dto.updatedAt : '',
            deletedAt: dto.deletedAt ? dto.deletedAt : '',
        };
    }

    public static emptyDto():Source {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            name: '',
            description: '',
            background: 'images/backgrounds/jobjab_sources.jpg',            
            createdAt: date,
            updatedAt: date,
            deletedAt: '',

        }
    }
}

export interface Source  extends BaseDto {
    id: string;
    orgId: string;
    name: string;
    description: string;
    background: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;    
}

