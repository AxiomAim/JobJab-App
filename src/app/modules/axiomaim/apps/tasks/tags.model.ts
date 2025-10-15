import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class TagModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        userId: string,
        title: string,
        createdAt?: string,
        updatedAt?: string,
        deletedAt?: string
        ) {
            this.id = id;
            this.orgId = orgId;
            this.userId = userId;
            this.title = title;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.deletedAt = deletedAt;
    }
    public id: string;
    public orgId: string;
    public userId: string;
    public title: string;
    public createdAt?: string;
    public updatedAt?: string;
    public deletedAt?: string;

    public static toDto(dto: Tag): Tag {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            userId: dto.userId ? dto.userId : '',
            title: dto.title ? dto.title : '',
            createdAt: dto.createdAt ? dto.createdAt : date,
            updatedAt: dto.updatedAt ? dto.updatedAt : date,
            deletedAt: dto.deletedAt ? dto.deletedAt : null,
        };
    }

    public static emptyDto():Tag {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            userId: '',
            title: '',
            createdAt: date,
            updatedAt: date,
            deletedAt: null,

        }
    }

}

export interface Tag  extends BaseDto {
    id: string;
    orgId: string;
    userId: string;
    title?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}


