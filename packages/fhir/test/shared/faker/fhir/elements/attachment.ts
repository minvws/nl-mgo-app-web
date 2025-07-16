import { faker } from '@faker-js/faker';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type Attachment } from 'fhir/r3';
import { code, dateTime } from '../type';

export const attachment = createMockFactory<Attachment>(() => {
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
