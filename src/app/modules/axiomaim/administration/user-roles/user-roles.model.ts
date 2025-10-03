import { BaseDto } from 'app/core/models/base-dto.model';
import { v4 as uuidv4 } from 'uuid';
import * as v from 'valibot';

export class UserRoleModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        domain: string,
        name: string,
        code: string,
        description: string,
        active?: boolean,
        createdAt?: string,
        updatedAt?: string,
        deletedAt?: string,
            ) {
            this.id = id;
            this.orgId = orgId;
            this.domain = domain;
            this.name = name;
            this.code = code;
            this.description = description;
            this.active = active;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.deletedAt = deletedAt;
    }
    public id: string;
    public orgId: string;
    public domain: string;
    public name: string;
    public code: string;
    public description: string;
    public active?: boolean;
    public createdAt?: string;
    public updatedAt?: string;
    public deletedAt?: string;

    public static toDto(dto: UserRole): UserRole {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            domain: dto.domain ? dto.domain : '',
            name: dto.name ? dto.name : '',
            code: dto.code ? dto.code : '',
            description: dto.description ? dto.description : '',
            active: dto.active ? dto.active : false,
            createdAt: dto.createdAt ? dto.createdAt : date,
            updatedAt: dto.updatedAt ? dto.updatedAt : date,
            deletedAt: dto.deletedAt ? dto.deletedAt : '',
        };
    }

    public static emptyDto(): UserRole {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            domain: '',
            name: '',
            code: '',
            description: '',
            active: false,
            createdAt: date,
            updatedAt: date,
            deletedAt: '',

        }
    }

}

export interface UserRole  extends BaseDto {
    id: string;
    orgId: string,
    domain: string;
    name: string;
    code: string;    
    description: string;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

const UserRoleSchema = v.object({
    id: v.pipe(v.string()),
    orgId: v.pipe(v.string()),
    domain: v.pipe(v.string()),
    name: v.pipe(v.string()),
    code: v.pipe(v.string()),    
    description: v.pipe(v.string()),
    active: v.pipe(v.boolean()),
    createdAt: v.pipe(v.string()),
    updatedAt: v.pipe(v.string()),
    deletedAt: v.pipe(v.string()),
});

