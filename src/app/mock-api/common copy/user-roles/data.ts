/* eslint-disable */
import { DateTime } from 'luxon';

/* Get the current instant */
const now = DateTime.now();

export const userRoles = [
    {
        id: '00000001-0001-0000-0000-000000000000',
        sort: 1,
        value: 'administrator',
        name: 'Administrator',
        description: '',
        isVisible: false,
    },
    {
        id: '00000001-0002-0000-0000-000000000000',
        sort: 2,
        value: 'owner',
        name: 'Owner',
        description: '',
        isVisible: true,

    },
    {
        id: '00000001-0003-0000-0000-000000000000',
        sort: 3,
        value: 'technician',
        name: 'Technication',
        description: '',
        isVisible: true,
    },
    {
        id: '00000001-0003-0000-0000-000000000000',
        sort: 4,
        value: 'sales',
        name: 'Sales',
        description: '',
        isVisible: true,
    },
];
