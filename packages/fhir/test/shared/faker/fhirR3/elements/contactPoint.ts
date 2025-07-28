import { faker } from '@faker-js/faker';
import { type ContactPoint } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { code, period } from '../type/index.js';

export const contactPoint = createMockFactory<ContactPoint>(() => ({
    system: code([
        'phone',
        'fax',
        'email',
        'pager',
        'url',
        'sms',
        'other',
    ]) as ContactPoint['system'],
    use: code(['home', 'work', 'temp', 'old', 'mobile']) as ContactPoint['use'],
    value: faker.lorem.word(),
    rank: faker.number.int(),
    period: period(),
}));
