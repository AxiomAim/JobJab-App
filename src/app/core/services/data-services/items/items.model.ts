import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class ItemModel {

    constructor(
        id: string,
        orgId: string,
        category: string,
        name: string,
        description: string,
        quantity?: number,
        cost?: number,
        price?: number,
        total?: number,
        active?: boolean,
        image?: string,
        optional?: boolean,
        deposit?: number,
        tax?: number,
        ) {
        this.id = id;
        this.orgId = orgId;
        this.category = category;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.cost = cost;
        this.price = price;
        this.total = total;
        this.active = active;
        this.image = image;
        this.optional = optional;
        this.deposit = deposit;
        this.tax = tax;
    }

    public id: string;
    public orgId: string;
    public category: string;
    public name: string;
    public description: string;
    public quantity: number;
    public cost: number;
    public price: number;
    public total: number;
    public active: boolean;
    public image: string;
    public optional: boolean;
    public deposit: number;
    public tax: number;

    public static emptyDto(): Item {
        return {
            id: uuidv4().toString(),
            orgId: null,
            category: '',
            name: '',
            description: '',
            quantity: 0,
            cost: 0,
            price: 0,
            total: 0,
            active: true,
            image: '',
            optional: false,
            deposit: 0,
            tax: 0,
        }
    }

    public static toDto(dto: Item): Item {
            return {
                id: dto.id ? dto.id : uuidv4().toString(),
                orgId: dto.orgId ? dto.orgId : null,
                category: dto.category ? dto.category : '',
                name: dto.name ? dto.name : '',
                description: dto.description ? dto.description : '',
                quantity: dto.quantity ? dto.quantity : 0,
                cost: dto.cost ? dto.cost : 0,
                price: dto.price ? dto.price : 0,
                total: dto.total ? dto.total : 0,
                active: dto.active !== undefined ? dto.active : true,
                image: dto.image ? dto.image : '',
                optional: dto.optional !== undefined ? dto.optional : false,
                deposit: dto.deposit ? dto.deposit : 0,
                tax: dto.tax ? dto.tax : 0,
            };
        }
    
}

export interface Item extends BaseDto {
    id: string;
    orgId: string;
    category: string;
    name: string;
    description: string;
    quantity: number;
    cost: number;
    price: number;
    total: number;
    active: boolean;
    image: string;
    optional: boolean;
    deposit: number;
    tax: number;
}


