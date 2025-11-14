import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class DealModel {

    constructor(
        id: string,
        orgId: string,
        contactId: string,
        stageId: string,
        userId: string,
        name: string,
        description: string,
        source: string,
        amount: number,
        probability: number,
        expectAt: string,
        closeAt: string,

        ) {
        this.id = id;
        this.orgId = orgId;
        this.contactId = contactId;
        this.stageId = stageId;
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.source = source;
        this.amount = amount;
        this.probability = probability;
        this.exepctAt = expectAt;
        this.closeAt = closeAt;

    }

    public id: string;
    public orgId: string;
    public contactId: string;
    public stageId: string;
    public userId: string;
    public name: string;
    public description: string;
    public source: string;
    public amount: number;
    public probability: number;
    public exepctAt: string;
    public closeAt: string;


    public static emptyDto(): Deal {
        return {
            id: uuidv4().toString(),
            orgId: null,
            contactId: null,
            stageId: null,
            userId: null,
            name: '',
            description: '',
            source: null,
            amount: 0,
            probability: 0,
            expectAt: '',
            closeAt: '',
        }
    }

    public static toDto(dto: Deal): Deal {
            return {
                id: dto.id ? dto.id : uuidv4().toString(),
                orgId: dto.orgId ? dto.orgId : null,
                contactId: dto.contactId ? dto.contactId : null,
                stageId: dto.stageId ? dto.stageId : null,
                userId: dto.userId ? dto.userId : null,
                name: dto.name ? dto.name : '',
                description: dto.description ? dto.description : '',
                source: dto.source ? dto.source : null,
                amount: dto.amount ? dto.amount : 0,
                probability: dto.probability ? dto.probability : 0,
                expectAt: dto.expectAt ? dto.expectAt : '',
                closeAt: dto.closeAt ? dto.closeAt : '',
            };
        }
    
}

export interface Deal extends BaseDto {
    id: string;
    orgId: string;
    contactId: string;
    stageId: string;
    userId: string;
    name: string;
    description: string;
    source: string;
    amount: number;
    probability: number;
    expectAt: string;
    closeAt: string;
}


