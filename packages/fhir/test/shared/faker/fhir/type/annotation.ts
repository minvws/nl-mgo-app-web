import { faker } from '@faker-js/faker';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type Annotation } from 'fhir/r3';
import { dateTime } from './dateTime';
import * as special from './reference';

export const annotation = createMockFactory<Annotation>(() => ({
    authorReference: special.reference(),
    authorString: faker.lorem.sentence(),
    text: faker.lorem.sentences(),
    time: dateTime(),
}));
