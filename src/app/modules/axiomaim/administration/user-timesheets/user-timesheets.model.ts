import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';


export class UserTimesheetModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        userId: string,
        background: string,
        dayAt: string,
        startAt: string,
        endAt: string,
        description: string,
        createdBy?: string,
        createdAt?: string,
        updatedAt?: string,
    ) {
        this.id = id;
        this.orgId = orgId;
        this.userId = userId;
        this.background = background;
        this.dayAt = dayAt;
        this.startAt = startAt;
        this.endAt = endAt;
        this.description = description;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    public id: string;
    public orgId: string;
    public userId: string;
    public background: string;
    public dayAt: string;
    public startAt: string;
    public endAt: string;
    public description: string;
    public createdBy?: string;
    public createdAt?: string;
    public updatedAt?: string;
    public deletedAt?: string;

    public static toDto(dto: UserTimesheet): UserTimesheet {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            userId: dto.userId ? dto.userId : '',
            background: dto.background ? dto.background : 'images/backgrounds/jobjab_user_timesheets.jpg',
            dayAt: dto.dayAt ? dto.dayAt : date,
            startAt: dto.startAt ? dto.startAt : date,
            endAt: dto.endAt ? dto.endAt : date,
            description: dto.description ? dto.description : '',
            createdBy: dto.createdBy ? dto.createdBy : '',
            createdAt: dto.createdAt ? dto.createdAt : date,
            updatedAt: dto.updatedAt ? dto.updatedAt : date,
            deletedAt: dto.deletedAt ? dto.deletedAt : '',
        };
    }

    public static emptyDto(): UserTimesheet {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            userId: '',
            background: 'images/backgrounds/jobjab_user_timesheets.jpg',
            dayAt: date,
            startAt: date,
            endAt: date,
            description: '',
            createdBy: '',
            createdAt: date,
            updatedAt: date,
            deletedAt: '',

        }
    }
}

export interface UserTimesheet  extends BaseDto {
    id: string;
    orgId: string;
    userId: string;
    background: string;
    dayAt: string;
    startAt: string;
    endAt: string;
    description: string;
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}


