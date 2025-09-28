import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';
import { ProjectTeamMember } from '../project-teams-members/project-teams-members.model';

export class ProjectTeamModel implements BaseDto {
    constructor(
        id: string,
        name: string,
        description: string,
        members: ProjectTeamMember[],
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,    
        ) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.members = members;
            this.created_at = created_at;
            this.updated_at = updated_at;
            this.deleted_at = deleted_at;
    }
    public id: string;
    public name: string;
    public description: string;
    public members: ProjectTeamMember[];
    public created_at?: string;
    public updated_at?: string;
    public deleted_at?: string;

    public static toDto(dto: ProjectTeam): ProjectTeam {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            name: dto.name ? dto.name : '',
            description: dto.description ? dto.description : '',
            members: dto.members ? dto.members : [],
            created_at: dto.created_at ? dto.created_at : date,
            updated_at: dto.updated_at ? dto.updated_at : null,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }

    public static emptyDto():ProjectTeam {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            name: '',
            description: '',
            members: [],
            created_at: date,
            updated_at: null,
            deleted_at: null,

        }
    }
}

export interface ProjectTeam  extends BaseDto {
    id: string;
    name: string;
    description: string;
    members: ProjectTeamMember[];
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;    
}

