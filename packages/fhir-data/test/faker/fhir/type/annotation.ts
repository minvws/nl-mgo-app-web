import { faker } from '@faker-js/faker';
import { type Annotation } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { dateTime } from './dateTime';
import * as special from './reference';

export const annotation = createMockDataFactory<Annotation>(() => ({
    authorReference: special.reference(),
    authorString: faker.lorem.sentence(),
    text: faker.lorem.sentences(),
    time: dateTime(),
}));
