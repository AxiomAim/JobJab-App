import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class PipelineModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        userId: string,
        name: string,
        description: string,
        color: string,
        isDefault: boolean,
        isClosed: boolean,
        createdBy: string,
        updatedBy: string,
        createdAt?: string,
        updatedAt?: string,
        deletedAt?: string,

        ) {
            this.id = id;
            this.orgId = orgId;
            this.userId = userId;
            this.name = name;
            this.description = description;
            this.color = color;
            this.isDefault = isDefault;
            this.isClosed = isClosed;
            this.createdBy = createdBy;
            this.updatedBy = updatedBy;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.deletedAt = deletedAt;
    }
    public id: string;
    public orgId: string;
    public userId: string;
    public name: string;
    public description: string;
    public color: string;
    public isDefault: boolean;
    public isClosed: boolean;
    public createdBy: string;
    public updatedBy: string;
    public createdAt?: string;
    public updatedAt?: string;
    public deletedAt?: string;

    public static toDto(dto: Pipeline): Pipeline {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            userId: dto.userId ? dto.userId : '',
            name: dto.name ? dto.name : '',
            description: dto.description ? dto.description : '',
            color: dto.color ? dto.color : '',
            isDefault: dto.isDefault ? dto.isDefault : false,
            isClosed: dto.isClosed ? dto.isClosed : false,
            createdBy: dto.createdBy ? dto.createdBy : '',
            updatedBy: dto.updatedBy ? dto.updatedBy : '',
            createdAt: dto.createdAt ? dto.createdAt : date,
            updatedAt: dto.updatedAt ? dto.updatedAt : date,
            deletedAt: dto.deletedAt ? dto.deletedAt : '',
        };
    }

    public static emptyDto():Pipeline {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            userId: '',
            name: '',
            description: '',
            color: '',
            isDefault: false,
            isClosed: false,
            createdBy: '',
            updatedBy: '',
            createdAt: date,
            updatedAt: date,
            deletedAt: '',

        }
    }
}

export interface Pipeline  extends BaseDto {
    id: string;
    orgId: string;
    userId: string;
    name: string;
    description: string;
    color: string;
    isDefault: boolean;
    isClosed: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;

}

export interface Phase {
    sort: number;
    name: string;
    description: string;
    color: string;
    isDefault: boolean;
    isClosed: boolean;
    createdBy: string;
    updatedBy: string;
}

