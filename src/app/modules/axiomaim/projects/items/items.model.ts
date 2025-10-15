import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';
import { Image } from 'app/core/models/image.model';

export class ItemModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        background: string,
        sort: number,
        sku: string,
        categories: string[],
        name: string,
        description: string,
        price: number,
        itemType: string,
        measure: string,
        images: Image[],
        discount: number,
        quantity: number,
        categoriesId: number,
        createdAt?: string,
        updatedAt?: string,
        deletedAt?: string,
        ) {
            this.id = id;
            this.orgId = orgId;
            this.background = background;
            this.sort = sort;
            this.sku = sku;
            this.categories = categories;
            this.name = name;
            this.description = description;
            this.price = price;
            this.itemType = itemType;
            this.measure = measure;
            this.images = images;
            this.discount = discount;
            this.quantity = quantity;
            this.categoriesId = categoriesId;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.deletedAt = deletedAt;
    }
    public id: string;
    public orgId: string;
    public background: string;
    public sort: number;
    public sku: string;
    public categories: string[];
    public name: string;
    public description: string;
    public price: number;
    public itemType: string;
    public measure: string;
    public images: Image[];
    public discount: number;
    public quantity: number;
    public categoriesId: number;
    public createdAt?: string;
    public updatedAt?: string;
    public deletedAt?: string;

    public static toDto(dto: Item): Item {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            background: dto.background ? dto.background : 'images/backgrounds/jobjab_items.jpg',
            sort: dto.sort ? dto.sort : 0,
            sku: dto.sku ? dto.sku : '',
            categories: dto.categories ? dto.categories : [],
            name: dto.name ? dto.name : '',
            description: dto.description ? dto.description : '',
            price: dto.price ? dto.price : 0,
            itemType: dto.itemType ? dto.itemType : '',
            measure: dto.measure ? dto.measure : '',
            images: dto.images ? dto.images : [],
            discount: dto.discount ? dto.discount : 0,
            quantity: dto.quantity ? dto.quantity : 0,
            categoriesId: dto.categoriesId ? dto.categoriesId : 0,
            createdAt: dto.createdAt ? dto.createdAt : date,
            updatedAt: dto.updatedAt ? dto.updatedAt : date,
            deletedAt: dto.deletedAt ? dto.deletedAt : '',
        };
    }

    public static emptyDto():Item {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            background: 'images/backgrounds/jobjab_items.jpg',
            sort: 0,
            sku: '',
            categories: [],
            name: '',
            description: '',
            price: 0,
            itemType: '',
            measure: '',
            images: [],
            discount: 0,
            quantity: 0,
            categoriesId: 0,
            createdAt: date,
            updatedAt: date,
            deletedAt: '',

        }
    }
}

export interface Item extends BaseDto {
    id: string;
    orgId: string;
    background: string;
    sort: number;
    sku: string;
    categories: string[];
    name: string;
    description: string;
    price: number;
    itemType: string;
    measure: string;
    images: Image[];
    discount: number;
    quantity: number;
    categoriesId: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;    
}

