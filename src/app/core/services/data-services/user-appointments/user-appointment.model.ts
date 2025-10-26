import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class UserAppointmentModel {

    constructor(
        id: string,
        orgId: string,
        userId: string,
        title: string,
        description: string,
        startTimezone: string,
        start: Date,
        end: Date,
        endTimezone: string,
        isAllDay: boolean,
        recurrenceRule: any,
        recurrenceId: string,
        recurrenceExceptions: string,
        ) {
        this.id = id;
        this.orgId = orgId;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.startTimezone = startTimezone;
        this.start = start;
        this.end = end;
        this.endTimezone = endTimezone;
        this.isAllDay = isAllDay;
        this.recurrenceRule = recurrenceRule;
        this.recurrenceId = recurrenceId;
        this.recurrenceExceptions = recurrenceExceptions;
    }

    public id: string;
    public orgId: string;
    public userId: string;
    public title: string;
    public description: string;
    public startTimezone: string;
    public start: Date;
    public end: Date;
    public endTimezone: string;
    public isAllDay: boolean;
    public recurrenceRule: any;
    public recurrenceId: string;
    public recurrenceExceptions: string;

    public static emptyDto(): UserAppointment {
        return {
            id: uuidv4().toString(),
            orgId: null,
            userId: null,
            title: '',
            description: '',
            startTimezone: '',
            start: new Date(),
            end: new Date(),
            endTimezone: '',
            isAllDay: false,
            recurrenceRule: null,
            recurrenceId: '',
            recurrenceExceptions: '',
        }
    }

    public static toDto(dto: UserAppointment): UserAppointment {
            return {
                id: dto.id ? dto.id : uuidv4().toString(),
                orgId: dto.orgId ? dto.orgId : null,
                userId: dto.userId ? dto.userId : null,
                title: dto.title ? dto.title : '',
                description: dto.description ? dto.description : '',
                startTimezone: dto.startTimezone ? dto.startTimezone : '',
                start: dto.start ? dto.start : new Date(),
                end: dto.end ? dto.end : new Date(),
                endTimezone: dto.endTimezone ? dto.endTimezone : '',
                isAllDay: dto.isAllDay ? dto.isAllDay : false,
                recurrenceRule: dto.recurrenceRule ? dto.recurrenceRule : null,
                recurrenceId: dto.recurrenceId ? dto.recurrenceId : '',
                recurrenceExceptions: dto.recurrenceExceptions ? dto.recurrenceExceptions : '',
            };
        }
    
}

export interface UserAppointment extends BaseDto {
    id: string;
    orgId: string;
    userId: string;
    title: string;
    description: string;
    startTimezone: string;
    start: Date;
    end: Date;
    endTimezone: string;
    isAllDay: boolean;
    recurrenceRule: any;
    recurrenceId: string;
    recurrenceExceptions: string;
}


