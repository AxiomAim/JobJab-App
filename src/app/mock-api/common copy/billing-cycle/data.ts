/* eslint-disable */
import { DateTime } from 'luxon';

/* Get the current instant */
const now = DateTime.now();

export const billingCyle = [
    {
        id: 'billing1-0001-0000-0000-000000000000',
        title: 'One Time Subscription',
        description: 'Billed once',
        active: false
    },
    {
        id: 'billing1-0002-0000-0000-000000000000',
        title: 'Semi-Monthly Subscription',
        description: 'Billed on the first and fifteenth of every month',
        active: false
    },
    {
        id: 'billing1-0003-0000-0000-000000000000',
        title: 'Monthly Subscription',
        description: 'Billed on the first of every month',
        active: true
    },
    {
        id: 'billing1-0004-0000-0000-000000000000',
        title: 'Quarterly Subscription',
        description: 'Billed on the first of every quarter',
        active: true
    },

];
