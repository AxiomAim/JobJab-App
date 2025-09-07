import * as v from 'valibot';

const PhoneNumberSchema = v.object({
    phoneNumber: v.pipe(v.string()),
    label: v.pipe(v.string()),
    country: v.pipe(v.string()),
});

const UserSchema = v.object({
        orgId: v.pipe(v.string()),
        domain: v.pipe(v.string()),
        firstTime: v.pipe(v.boolean()),
        staffId: v.pipe(v.number()),
        staff: v.pipe(v.boolean()),
        projectId: v.pipe(v.string()),
        activeUser: v.pipe(v.boolean()),
        email: v.pipe(v.string(), v.email()),
        emailKey: v.pipe(v.string()),
        personalEmail: v.pipe(v.string()),
        userName: v.pipe(v.string()),
        displayName: v.pipe(v.string()),
        title: v.pipe(v.string()),
        signatureName: v.pipe(v.string()),
        signatureRole: v.pipe(v.string()),
        signaturePassword: v.pipe(v.string()),
        signatureUrl: v.pipe(v.string()),
        signaturePath: v.pipe(v.string()),
        signatureFile: v.pipe(v.string()),
        signatureType: v.pipe(v.string()),
        firstName: v.pipe(v.string()),
        lastName: v.pipe(v.string()),
        address: v.pipe(v.string()),
        emailSignature: v.pipe(v.string()),
        avatar: v.pipe(v.string()),
        avatarUrl: v.pipe(v.string()),
        avatarPath: v.pipe(v.string()),
        avatarFile: v.pipe(v.string()),
        avatarType: v.pipe(v.string()),
        background: v.pipe(v.string()),
        linkedIn: v.pipe(v.string()),
        phoneNumbers: v.pipe(PhoneNumberSchema),
        mobileCountry: v.pipe(v.string()),
        mobileNo: v.pipe(v.string()),
        officeNo: v.pipe(v.string()),
        token: v.pipe(v.string()),
        web_token: v.pipe(v.string()),
        tokenDate: v.pipe(v.string()),
        status: v.pipe(v.string()),
        platform: v.pipe(v.string()),
        selected: v.pipe(v.boolean()),
        login_at: v.pipe(v.string()),
        login_info: v.pipe(v.any()),
        created_at: v.pipe(v.string()),
        updated_at: v.pipe(v.string()),
        deleted_at: v.pipe(v.string()),    
});

const CountrySchema = v.object({
    id: v.pipe(v.string()),
    iso: v.pipe(v.string()),
    name: v.pipe(v.string()),
    code: v.pipe(v.string()),
    flagImagePos: v.pipe(v.string()),
});

// Infer output TypeScript type of login schema
export type UserSchemaData = v.InferOutput<typeof UserSchema>; // { email: string; password: string }

