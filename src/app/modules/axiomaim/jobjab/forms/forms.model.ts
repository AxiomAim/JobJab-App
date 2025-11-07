import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';
import { Source } from '../../crm/sources/sources.model';
import { FormlyFieldConfig } from '@ngx-formly/core';

export class FormModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        name: string,
        fields: FormlyFieldConfig[],
        formJason?: any,
        createdAt?: string,
        updatedAt?: string,
        deletedAt?: string,
        ) {
            this.id = id;
            this.orgId = orgId;
            this.name = name;
            this.fields = fields;
            this.formJson = formJason;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.deletedAt = deletedAt;
    }
    public id: string;
    public orgId: string;
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
            name: dto.name ? dto.name : '',
            fields: dto.fields ? dto.fields : [],
            formJson: dto.formJson ? dto.formJson : '',
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
            name: '',
            fields: [],
            formJson: {
                elements: [{
                    name: "FirstName",
                    title: "Enter your first name:",
                    type: "text"
                }, {
                    name: "LastName",
                    title: "Enter your last name:",
                    type: "text"
                }]
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
    name: string;
    fields: FormlyFieldConfig[];
    formJson?: any;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;    
}

export interface FieldData {
    key: string;
    type: string;
    props: FieldProps;
}

export interface FieldProps {
    label: string;
    placeholder: string;
    description: string;
    required: boolean;
    options?: Array<{ value: any; label: string }>;
}
