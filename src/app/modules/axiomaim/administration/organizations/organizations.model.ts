import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';
import { User } from '../users/users.model';

export class OrganizationModel implements BaseDto {
    constructor(
            id: string,
            orgId: string,
            userId: string,
            name: string,
            description: string,
            domain: string,
            address: string,
            phone: string,
            email: string,
            contact: string,
            users: User[],
            logo: string,
            logo_light: string,
            logo_dark: string,
            slides: Slides[],
            testimonials: Testimonials[],
            homeIntro: HomeIntro[],
            website: string,
            facebook: string,
            x: string,
            linkedIn: string,
            google: string,
            instagram: string,
            myApp: MyApp,
            createdAt?: string,
            updatedAt?: string,
            deletedAt?: string,    
        ) {
            this.id = id;
            this.orgId = orgId;
            this.userId = userId;
            this.name = name;
            this.description = description;
            this.domain = domain;
            this.address = address;
            this.phone = phone;
            this.email = email;
            this.contact = contact;
            this.users = users;
            this.logo = logo;
            this.logo_light = logo_light;
            this.logo_dark = logo_dark;
            this.slides = slides;
            this.testimonials = testimonials;
            this.homeIntro = homeIntro;
            this.website = website;
            this.facebook = facebook;
            this.x = x;
            this.linkedIn = linkedIn;
            this.google = google;
            this.instagram = instagram;
            this.myApp = myApp;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.deletedAt = deletedAt;
    }
    public id: string;
    public orgId: string;
    public userId: string;
    public name: string;
    public description: string;
    public domain: string;
    public address: string;
    public phone: string;
    public email: string;
    public contact: string;
    public users: User[];
    public logo: string;
    public logo_light: string;
    public logo_dark: string;
    public slides: Slides[];
    public testimonials: Testimonials[];
    public homeIntro: HomeIntro[];
    public website: string;
    public facebook: string;
    public x: string;
    public linkedIn: string;
    public google: string;
    public instagram: string;
    public myApp: MyApp;
    public createdAt?: string;
    public updatedAt?: string;
    public deletedAt?: string;

    public static toDto(dto: Organization): Organization {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.id ? dto.id : '',
            userId: dto.userId ? dto.userId : '',
            name: dto.name ? dto.name : '',
            description: dto.description ? dto.description : '',
            domain: dto.domain ? dto.domain : '',
            address: dto.address ? dto.address : '',
            phone: dto.phone ? dto.phone : '',
            email: dto.email ? dto.email : '',
            contact: dto.contact ? dto.contact : '',
            users: dto.users ? dto.users : [],
            logo: dto.logo ? dto.logo : '',
            logo_light: dto.logo_light ? dto.logo_light : '',
            logo_dark: dto.logo_dark ? dto.logo_dark : '',
            slides: dto.slides ? dto.slides : [],
            testimonials: dto.testimonials ? dto.testimonials : [],
            homeIntro: dto.homeIntro ? dto.homeIntro : [],
            website: dto.website ? dto.website : '',
            facebook: dto.facebook ? dto.facebook : '',
            x: dto.x ? dto.x : '',
            linkedIn: dto.linkedIn ? dto.linkedIn : '',
            google: dto.google ? dto.google : '',
            instagram: dto.instagram ? dto.instagram : '',
            myApp: dto.myApp ? dto.myApp : {title:0, description:'', play:'', playButton:'', appstore:'', appstoreButton:'', image:''},
            createdAt: dto.createdAt ? dto.createdAt : date,
            updatedAt: dto.updatedAt ? dto.updatedAt : date,
            deletedAt: dto.deletedAt ? dto.deletedAt : '',
        };
    }

    public static emptyDto():Organization {
        let date: any = new Date().toISOString();
        let id: any = uuidv4().toString();
        return {
            id: id,
            orgId: id,
            userId: '',
            name: '',
            description: '',
            domain: '',
            address: '',
            phone: '',
            email: '',
            contact: '',
            users: [],
            logo: '',
            logo_light: '',
            logo_dark: '',
            slides: [],
            testimonials: [],
            homeIntro: [],
            website: '',
            facebook: '',
            x: '',
            linkedIn: '',
            google: '',
            instagram: '',
            myApp: {title:0, description:'', play:'', playButton:'', appstore:'', appstoreButton:'', image:''},
            createdAt: date,
            updatedAt: date,
            deletedAt: '',

        }
    }
}

export interface Organization  extends BaseDto {
    id: string;
    orgId: string;
    userId: string;
    name: string;
    description: string;
    domain: string;
    address: string;
    phone: string;
    email: string;
    contact: string;
    users: User[];
    logo: string;
    logo_light: string;
    logo_dark: string;
    slides: Slides[];
    testimonials: Testimonials[];
    homeIntro: HomeIntro[];
    website: string;
    facebook: string;
    x: string;
    linkedIn: string;
    google: string;
    instagram: string;
    myApp: MyApp;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;    
}

export interface Slides {
    index: number;
    title: string;
    description: string;
    image: string;
}

export interface AboutUs {
    index: number;
    title: string;
    description: string;
    image: string;
}

export interface HomeIntro {
    index: number;
    title: string;
    description: string;
    image: string;
}

export interface Testimonials {
    index: number;
    text: string;
    author: string;
    position: string;
    image: string;
}

export interface MyApp {
    title: number;
    description: string;
    play: string;
    playButton: string;
    appstore: string;
    appstoreButton: string;
    image: string;
}

export interface Contact {
    name: number;
    title: string;
    phone: string;
    email: string;
    image: string;
}
