import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class MyEventModel {

    constructor(
        id: string,
        orgId: string,
        userId: string,
        TaskID?: number,
        OwnerID?: number,
        Title?: string,
        Description?: string,
        Start?: Date,
        End?: Date,
        start?: Date,
        end?: Date,
        StartTimezone?: string,
        EndTimezone?: string,
        IsAllDay?: boolean,
        RecurrenceException?: any,
        RecurrenceID?: number,
        RecurrenceRule?: string,
        ) {
        this.id = id;
        this.orgId = orgId;
        this.userId = userId;
        this.TaskID = TaskID;
        this.OwnerID = OwnerID;
        this.Title = Title;
        this.Description = Description;
        this.Start = Start;
        this.End = End;

        this.StartTimezone = StartTimezone;
        this.EndTimezone = EndTimezone;
        this.IsAllDay = IsAllDay;
        this.RecurrenceException = RecurrenceException;
        this.RecurrenceID = RecurrenceID;
        this.RecurrenceRule = RecurrenceRule;
    }

    public id: string;
    public orgId: string;
    public userId: string;
    public TaskID?: number;
    public OwnerID?: number;
    public Title?: string;
    public Description?: string;
    public Start?: Date;
    public End?: Date;
    public start?: Date;
    public end?: Date;
    public StartTimezone?: string;
    public EndTimezone?: string;
    public IsAllDay?: boolean;
    public RecurrenceException?: any;
    public RecurrenceID?: number;
    public RecurrenceRule?: string;


    public static emptyDto(): MyEvent {
        return {
            id: uuidv4().toString(),
            orgId: null,
            userId: null,
            TaskID: null,
            OwnerID: null,
            Title: null,
            Description: null,
            Start: null,
            End: null,
            start: null, 
            end: null, 
            StartTimezone: null,
            EndTimezone: null,
            IsAllDay: null,
            RecurrenceException: null,
            RecurrenceID: null,
            RecurrenceRule: null
        }
    }

    public static toDto(dto: MyEvent): MyEvent {
            return {
                id: dto.id ? dto.id : uuidv4().toString(),
                orgId: dto.orgId ? dto.orgId : null,
                userId: dto.userId ? dto.userId : null,
                TaskID: dto.TaskID ? dto.TaskID : null,
                OwnerID: dto.OwnerID ? dto.OwnerID : null,
                Title: dto.Title ? dto.Title : null,
                Description: dto.Description ? dto.Description : null,
                Start: dto.Start ? dto.Start : null,
                End: dto.End ? dto.End : null,
                start: dto.start ? dto.start : null,
                end: dto.end ? dto.end : null,
                StartTimezone: dto.StartTimezone ? dto.StartTimezone : null,
                EndTimezone: dto.EndTimezone ? dto.EndTimezone : null,
                IsAllDay: dto.IsAllDay ? dto.IsAllDay : null,
                RecurrenceException: dto.RecurrenceException ? dto.RecurrenceException : null,
                RecurrenceID: dto.RecurrenceID ? dto.RecurrenceID : null,
                RecurrenceRule: dto.RecurrenceRule ? dto.RecurrenceRule : null
            };
        }
    
}

export interface MyEvent extends BaseDto {
    id: string;
    orgId: string;
    userId: string;
    TaskID?: number;
    OwnerID?: number;
    Title?: string;
    Description?: string;
    Start?: Date;
    End?: Date;
    start?: Date;
    end?: Date;
    StartTimezone?: string;
    EndTimezone?: string;
    IsAllDay?: boolean;
    RecurrenceException?: any;
    RecurrenceID?: number;
    RecurrenceRule?: string;
}


