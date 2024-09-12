import { faker } from '@faker-js/faker';
import { type ContactPoint } from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';
import { mockOptionalFields } from '../../helpers';
import { code, period } from '../type';

export const contactPoint = createMockDataFactory<ContactPoint>(() => {
    return mockOptionalFields({
        system: code(['phone', 'fax', 'email', 'pager', 'url', 'sms', 'other']),
        use: code(['home', 'work', 'temp', 'old', 'mobile']),
        value: faker.lorem.word(),
        rank: faker.number.int(),
        period: period(),
    });
});
