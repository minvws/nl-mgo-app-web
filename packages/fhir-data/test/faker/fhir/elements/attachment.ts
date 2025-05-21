import { faker } from '@faker-js/faker';
import { type Attachment } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { code, dateTime } from '../type';

export const attachment = createMockDataFactory<Attachment>(() => {
    return {
        contentType: code(),
        language: code(),
        data: faker.lorem.word(),
        url: faker.internet.url(),
        size: faker.number.int(),
        hash: faker.lorem.word(),
        title: faker.lorem.word(),
        creation: dateTime(),
    };
});
