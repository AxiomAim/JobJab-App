/* eslint-disable */
import { DateTime } from 'luxon';

/* Get the current instant */
const now = DateTime.now();

export const phoneLabels = [
    {
        id: '00000002-0001-0000-0000-000000000000',
        sort: 1,
        value: 'mobile',
        name: 'Mobile',
    },
    {
        id: '00000002-0002-0000-0000-000000000000',
        sort: 2,
        value: 'work',
        name: 'Work',

    },
    {
        id: '00000002-0003-0000-0000-000000000000',
        sort: 3,
        value: 'home',
        name: 'Home',
    },
    {
        id: '00000001-0003-0000-0000-000000000000',
        sort: 4,
        value: 'other',
        name: 'Other',
    },
];
