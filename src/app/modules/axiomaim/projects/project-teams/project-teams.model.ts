import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';
import { ProjectTeamMember } from '../project-teams-members/project-teams-members.model';

export class ProjectTeamModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        name: string,
        description: string,
        members: ProjectTeamMember[],
        createdAt?: string,
        updatedAt?: string,
        deletedAt?: string,    
        ) {
            this.id = id;
            this.orgId = orgId;
            this.name = name;
            this.description = description;
            this.members = members;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.deletedAt = deletedAt;
    }
    public id: string;
    public orgId: string;
    public name: string;
    public description: string;
    public members: ProjectTeamMember[];
    public createdAt?: string;
    public updatedAt?: string;
    public deletedAt?: string;

    public static toDto(dto: ProjectTeam): ProjectTeam {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            name: dto.name ? dto.name : '',
            description: dto.description ? dto.description : '',
            members: dto.members ? dto.members : [],
            createdAt: dto.createdAt ? dto.createdAt : date,
            updatedAt: dto.updatedAt ? dto.updatedAt : null,
            deletedAt: dto.deletedAt ? dto.deletedAt : null,
        };
    }

    public static emptyDto():ProjectTeam {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            name: '',
            description: '',
            members: [],
            createdAt: date,
            updatedAt: null,
            deletedAt: null,

        }
    }
}

export interface ProjectTeam  extends BaseDto {
    id: string;
    orgId: string;
    name: string;
    description: string;
    members: ProjectTeamMember[];
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;    
}

