import { faker } from '@faker-js/faker';
import { type Attachment } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { code, dateTime } from '../type/index.js';

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
