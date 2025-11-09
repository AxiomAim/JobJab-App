import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';
import { Source } from '../../crm/sources/sources.model';
import { FormlyFieldConfig } from '@ngx-formly/core';

export class FormModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        contactId: string,
        name: string,
        fields: FormlyFieldConfig[],
        formJason?: any,
        createdAt?: string,
        updatedAt?: string,
        deletedAt?: string,
        ) {
            this.id = id;
            this.orgId = orgId;
            this.contactId = contactId;
            this.name = name;
            this.fields = fields;
            this.formJson = formJason;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.deletedAt = deletedAt;
    }
    public id: string;
    public orgId: string;
    public contactId: string;
    public name: string;
    public fields: FormlyFieldConfig[];
    public formJson?: any;
    public createdAt?: string;
    public updatedAt?: string;
    public deletedAt?: string;

    public static toDto(dto: Form): Form {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            contactId: dto.contactId ? dto.contactId : '',
            name: dto.name ? dto.name : '',
            fields: dto.fields ? dto.fields : [],
            formJson: dto.formJson ? dto.formJson : 
            {
                title: 'Request Form',
                description: 'Request a quote by filling out the form below.',
                pages: [
                    {
                    name: 'page1',
                    elements: [
                        {
                        type: 'text',
                        name: 'firstName',
                        title: 'First name:',
                        isRequired: true
                        },
                        {
                        type: 'text',
                        name: 'lastName',
                        startWithNewLine: false,
                        title: 'Last name:',
                        isRequired: true
                        },
                        {
                        type: 'text',
                        name: 'phoneNumber',
                        title: 'Phone number:',
                        isRequired: true,
                        inputType: 'tel'
                        },
                        {
                        type: 'text',
                        name: 'email',
                        startWithNewLine: false,
                        title: 'Email address:',
                        isRequired: true,
                        inputType: 'email'
                        },
                        {
                        type: 'address-lookup',
                        name: 'address',
                        title: 'Address:',
                        isRequired: true,
                        placeholder: 'Enter Address'
                        }
                    ]
                    }
                ]
            },
            createdAt: dto.createdAt ? dto.createdAt : '',
            updatedAt: dto.updatedAt ? dto.updatedAt : '',
            deletedAt: dto.deletedAt ? dto.deletedAt : '',
        };
    }

    public static emptyDto():Form {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            contactId: '',
            name: '',
            fields: [],
            formJson: 
            {
            title: 'Request Form',
            description: 'Request a quote by filling out the form below.',
            pages: [
                {
                name: 'page1',
                elements: [
                    {
                    type: 'text',
                    name: 'firstName',
                    title: 'First name:',
                    isRequired: true
                    },
                    {
                    type: 'text',
                    name: 'lastName',
                    startWithNewLine: false,
                    title: 'Last name:',
                    isRequired: true
                    },
                    {
                    type: 'text',
                    name: 'phoneNumber',
                    title: 'Phone number:',
                    isRequired: true,
                    inputType: 'tel'
                    },
                    {
                    type: 'text',
                    name: 'email',
                    startWithNewLine: false,
                    title: 'Email address:',
                    isRequired: true,
                    inputType: 'email'
                    },
                    {
                    type: 'address-lookup',
                    name: 'address',
                    title: 'Address:',
                    isRequired: true,
                    placeholder: 'Enter Address'
                    }
                ]
                }
            ]
            },
            createdAt: date,
            updatedAt: date,
            deletedAt: '',

        }
    }
}

export interface Form  extends BaseDto {
    id: string;
    orgId: string;
    contactId: string;
    name: string;
    fields: FormlyFieldConfig[];
    formJson?: any;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;    
}

