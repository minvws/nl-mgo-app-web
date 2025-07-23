import { faker } from '@faker-js/faker';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type Annotation } from 'fhir/r3';
import { dateTime } from './dateTime.js';
import { reference } from './reference.js';

export const annotation = createMockFactory<Annotation>(() => ({
    authorReference: reference(),
    authorString: faker.lorem.sentence(),
    text: faker.lorem.sentences(),
    time: dateTime(),
}));
