import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class QuoteModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        projectId: string,
        quote: number,
        name: string,
        description: string,
        price: number,
        priceType: string,
        priceMeasure: string,
        image: string,
        discount: number,
        cartCount: number,
        categoryId: number,
        other: boolean,
        otherQuote: number,
        otherDescription: string,
        house: boolean,
        houseQuote: number,
        driveway: boolean,
        drivewayQuote: number,
        walkway: boolean,
        walkwayQuote: number,
        fence: boolean,
        fenceQuote: number,
        deck: boolean,
        deckQuote: number,
        patio: boolean,
        patioQuote: number,
        bin: boolean,
        binQuote: number,
        binQuarterly: boolean,
        binQuarterlyQuote: number,
        binMonthly: boolean,
        binMonthlyQuote: number,
        createdAt?: string,
        updatedAt?: string,
        deletedAt?: string,
        ) {
            this.id = id;
            this.orgId = orgId;
            this.projectId = projectId;
            this.quote = quote;
            this.name = name;
            this.description = description;
            this.price = price;
            this.priceType = priceType;
            this.priceMeasure = priceMeasure;
            this.image = image;
            this.discount = discount;
            this.cartCount = cartCount;
            this.other = other;
            this.otherQuote = otherQuote;
            this.otherDescription = otherDescription;
            this.house = house;
            this.houseQuote = houseQuote;
            this.driveway = driveway;
            this.drivewayQuote = drivewayQuote;
            this.walkway = walkway;
            this.walkwayQuote = walkwayQuote;
            this.fence = fence;
            this.fenceQuote = fenceQuote;
            this.deck = deck;
            this.deckQuote = deckQuote;
            this.patio = patio;
            this.patioQuote = patioQuote;
            this.bin = bin;
            this.binQuote = binQuote;
            this.binQuarterly = binQuarterly;
            this.binQuarterlyQuote = binQuarterlyQuote;
            this.binMonthly = binMonthly;
            this.binMonthlyQuote = binMonthlyQuote;
            this.categoryId = categoryId;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.deletedAt = deletedAt;
    }
    public id: string;
    public orgId: string;
    public projectId: string;
    public quote: number;
    public name: string;
    public description: string;
    public price: number;
    public priceType: string;
    public priceMeasure: string;
    public image: string;
    public discount: number;
    public cartCount: number;
    public categoryId: number;
    public other: boolean;
    public otherQuote: number;
    public otherDescription: string;
    public house: boolean;
    public houseQuote: number;
    public driveway: boolean;
    public drivewayQuote: number;
    public patio: boolean;
    public patioQuote: number;
    public walkway: boolean;
    public walkwayQuote: number;
    public fence: boolean;
    public fenceQuote: number;
    public deck: boolean;
    public deckQuote: number;
    public bin: boolean;
    public binQuote: number;
    public binQuarterly: boolean;
    public binQuarterlyQuote: number;
    public binMonthly: boolean;
    public binMonthlyQuote: number;
    public createdAt?: string;
    public updatedAt?: string;
    public deletedAt?: string;

    public static toDto(dto: Quote): Quote {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            projectId: dto.projectId ? dto.projectId : '',
            quote: dto.quote ? dto.quote : 0,
            name: dto.name ? dto.name : '',
            description: dto.description ? dto.description : '',
            price: dto.price ? dto.price : 0,
            priceType: dto.priceType ? dto.priceType : '',
            priceMeasure: dto.priceMeasure ? dto.priceMeasure : '',
            image: dto.image ? dto.image : '',
            discount: dto.discount ? dto.discount : 0,
            cartCount: dto.cartCount ? dto.cartCount : 0,
            other: dto.other ? dto.other : false,
            otherQuote: dto.otherQuote ? dto.otherQuote : 0,
            otherDescription: dto.otherDescription ? dto.otherDescription : '',
            house: dto.house ? dto.house : false,
            houseQuote: dto.houseQuote ? dto.houseQuote : 0,
            driveway: dto.driveway ? dto.driveway : false,
            drivewayQuote: dto.drivewayQuote ? dto.drivewayQuote : 0,
            patio: dto.patio ? dto.patio : false,
            patioQuote: dto.patioQuote ? dto.patioQuote : 0,
            walkway: dto.walkway ? dto.walkway : false,
            walkwayQuote: dto.walkwayQuote ? dto.walkwayQuote : 0,
            fence: dto.fence ? dto.fence : false,
            fenceQuote: dto.fenceQuote ? dto.fenceQuote : 0,
            deck: dto.deck ? dto.deck : false,
            deckQuote: dto.deckQuote ? dto.deckQuote : 0,
            bin: dto.bin ? dto.bin : false,
            binQuote: dto.binQuote ? dto.binQuote : 0,
            binQuarterly: dto.binQuarterly ? dto.binQuarterly : false,
            binQuarterlyQuote: dto.binQuarterlyQuote ? dto.binQuarterlyQuote : 0,
            binMonthly: dto.binMonthly ? dto.binMonthly : false,
            binMonthlyQuote: dto.binMonthlyQuote ? dto.binMonthlyQuote : 0,
            categoryId: dto.categoryId ? dto.categoryId : 0,
            createdAt: dto.createdAt ? dto.createdAt : date,
            updatedAt: dto.updatedAt ? dto.updatedAt : date,
            deletedAt: dto.deletedAt ? dto.deletedAt : '',
        };
    }

    public static emptyDto():Quote {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            projectId: '',
            quote: 0,
            name: '',
            description: '',
            price: 0,
            priceType: '',
            priceMeasure: '',
            image: '',
            discount: 0,
            cartCount: 0,
            categoryId: 0,
            other: false,
            otherQuote: 0,
            otherDescription: '',
            house: false,
            houseQuote: 0,
            driveway: false,
            drivewayQuote: 0,
            walkway: false,
            walkwayQuote: 0,
            fence: false,
            fenceQuote: 0,
            deck: false,
            deckQuote: 0,
            patio: false,
            patioQuote: 0,
            bin: false,
            binQuote: 0,
            binQuarterly: false,
            binQuarterlyQuote: 0,
            binMonthly: false,
            binMonthlyQuote: 0,
            createdAt: date,
            updatedAt: date,
            deletedAt: '',

        }
    }
}

export interface Quote  extends BaseDto {
    id: string;
    orgId: string;
    projectId: string;
    quote: number;
    name: string;
    description: string;
    price: number;
    priceType: string;
    priceMeasure: string;
    image: string;
    discount: number;
    cartCount: number;
    categoryId: number;
    other: boolean;
    otherQuote: number;
    otherDescription: string;
    house: boolean;
    houseQuote: number;
    driveway: boolean;
    drivewayQuote: number;
    walkway: boolean;
    walkwayQuote: number;
    fence: boolean;
    fenceQuote: number;
    deck: boolean;
    deckQuote: number;
    patio: boolean;
    patioQuote: number;
    bin: boolean;
    binQuote: number;
    binQuarterly: boolean;
    binQuarterlyQuote: number;
    binMonthly: boolean;
    binMonthlyQuote: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;    
}

