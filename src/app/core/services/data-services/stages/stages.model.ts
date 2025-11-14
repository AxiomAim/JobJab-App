import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class StageModel {

    constructor(
        id: string,
        orgId: string,
        name: string,
        slug: string,
        query: boolean,
        quote: boolean,
        job: boolean,
        invoice: boolean,
        percent: number,

        ) {
        this.id = id;
        this.orgId = orgId;
        this.name = name;
        this.slug = slug;
        this.query = query;
        this.quote = quote;
        this.job = job;
        this.invoice = invoice;
        this.percent = percent;

    }

    public id: string;
    public orgId: string;
    public name: string;
    public slug: string;
    public query: boolean;
    public quote: boolean;
    public job: boolean;
    public invoice: boolean;
    public percent: number;


    public static emptyDto(): Stage {
        return {
            id: uuidv4().toString(),
            orgId: null,
            name: '',
            slug: '',
            query: false,
            quote: false,
            job: false,
            invoice: false,
            percent: 0,
        }
    }

    public static toDto(dto: Stage): Stage {
            return {
                id: dto.id ? dto.id : uuidv4().toString(),
                orgId: dto.orgId ? dto.orgId : null,
                name: dto.name ? dto.name : '',
                slug: dto.slug ? dto.slug : '',
                query: dto.query ? dto.query : false,
                quote: dto.quote ? dto.quote : false,
                job: dto.job ? dto.job : false,
                invoice: dto.invoice ? dto.invoice : false,
                percent: dto.percent ? dto.percent : 0,
            };
        }
    
}

export interface Stage extends BaseDto {
    id: string;
    orgId: string;
    name: string;
    slug: string;
    query: boolean;
    quote: boolean;
    job: boolean;
    invoice: boolean;
    percent: number;
}


