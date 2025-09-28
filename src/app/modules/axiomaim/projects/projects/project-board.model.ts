import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';
import { User } from '@angular/fire/auth';
import { ProjectLabel } from './project-label.model';

export class ProjectBoardModel {
    constructor(
        id: string,
        orgId?: string,          
        userId?: string,          
        title?: string,
        description?: string | null,
        icon?: string | null,
        lastActivity?: string | null,
        labels?: ProjectLabel[],
        users?: User[],
        tags?: string[],
        active?: boolean,
        fileType?: string,
        fileName?: string,
        filePath?: string,
        fileUrl?: string,   
        startAt?: string,
        endAt?: string,
        closeAt?: string,
        createdBy?: User,
        createdAt?: string,
        updatedAt?: string,
        deletedAt?: string,
    
            
            ) {
        this.id = id;
        this.orgId = orgId;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.lastActivity = lastActivity;
        this.labels = labels;
        this.users = users;
        this.tags = tags;
        this.active = active;
        this.fileType = fileType;
        this.fileName = fileName;
        this.filePath = filePath;
        this.fileUrl = fileUrl;
        this.startAt = startAt;
        this.endAt = endAt;
        this.closeAt = closeAt;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

                
    }

    public id: string;
    public orgId: string;
    public userId: string;
    public title: string;
    public description: string | null;
    public icon: string | null;
    public lastActivity: string | null;
    public labels: ProjectLabel[];
    public users: User[];
    public tags?: string[];
    public active?: boolean;
    public fileType: string;
    public fileName: string;
    public filePath: string;
    public fileUrl: string;
    public startAt?: string;
    public endAt?: string;
    public closeAt?: string;
    public createdBy?: User;
    public createdAt?: string;
    public updatedAt?: string;
    public deletedAt?: string;


    public static emptyDto(): ProjectBoard {
        let datetime: any = new Date().toISOString();

        return {
            id: uuidv4().toString(),
            orgId: '',
            userId: '',
            title: '',
            description: '',
            icon: 'batch_prediction',
            lastActivity: '',
            labels: [],
            users: [],
            tags: [],
            active: false,
            fileType: '',
            fileName: '',
            filePath: '',
            fileUrl: '',
            startAt: '',
            endAt: '',
            closeAt: '',
            createdBy: null,
            createdAt: datetime,
            updatedAt: datetime,
            deletedAt: '',

        }
    }

    public static toDto(dto: ProjectBoard): ProjectBoard {
        let datetime: any = new Date().toISOString();
            return {
                id: dto.id ? dto.id : uuidv4().toString(),
                orgId: dto.orgId ? dto.orgId : '',
                userId: dto.userId ? dto.userId : '',
                title: dto.title ? dto.title : '',
                description: dto.description ? dto.description : '',
                icon: dto.icon ? dto.icon : 'batch_prediction',
                lastActivity: dto.lastActivity ? dto.lastActivity : '', 
                labels: dto.labels ? dto.labels : [],
                users: dto.users ? dto.users : [],
                tags: dto.tags ? dto.tags : [],
                active: dto.active ? dto.active : false,
                fileType: dto.fileType ? dto.fileType : '',
                fileName: dto.fileName ? dto.fileName : '',
                filePath: dto.filePath ? dto.filePath : '',
                fileUrl: dto.fileUrl ? dto.fileUrl : '',
                startAt: dto.startAt ? dto.startAt : datetime,
                endAt: dto.endAt ? dto.endAt : datetime,
                closeAt: dto.closeAt ? dto.closeAt : datetime,
                createdBy: dto.createdBy ? dto.createdBy : null,
                createdAt: dto.createdAt ? dto.createdAt : datetime,
                updatedAt: dto.updatedAt ? dto.updatedAt : datetime,
                deletedAt: dto.deletedAt ? dto.deletedAt : datetime,

            };
        }    
}


export interface ProjectBoard extends BaseDto {
    id: string;
    orgId: string;
    userId: string;
    title: string;
    description: string | null;
    icon: string | null;
    lastActivity: string | null;
    labels: ProjectLabel[];
    users: User[];
    tags?: string[];
    active?: boolean;
    fileType?: string;
    fileName?: string;
    filePath?: string;
    fileUrl?: string;   
    startAt?: string;
    endAt?: string;
    closeAt?: string;
    createdBy?: User;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
    
}







