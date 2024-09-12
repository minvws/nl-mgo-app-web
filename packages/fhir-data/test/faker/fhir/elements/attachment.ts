import { faker } from '@faker-js/faker';
import { type Attachment } from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';
import { mockOptionalFields } from '../../helpers';
import { code, dateTime } from '../type';

export const attachment = createMockDataFactory<Attachment>(() => {
    return mockOptionalFields({
        contentType: code(),
        language: code(),
        data: faker.lorem.word(),
        url: faker.internet.url(),
        size: faker.number.int(),
        hash: faker.lorem.word(),
        title: faker.lorem.word(),
        creation: dateTime(),
    });
});
