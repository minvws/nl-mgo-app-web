import { faker } from '@faker-js/faker';
import { type ContactPoint } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { code, period } from '../type';

export const contactPoint = createMockDataFactory<ContactPoint>(() => ({
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
