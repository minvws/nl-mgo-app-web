import { faker } from '@faker-js/faker';
import { type Annotation } from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';
import { mockOptionalFields } from '../../helpers';
import { dateTime } from './dateTime';
import * as special from './reference';

export const annotation = createMockDataFactory<Annotation>(() => {
    return mockOptionalFields(
        {
            authorReference: special.reference(),
            authorString: faker.lorem.sentence(),
            text: faker.lorem.sentences(),
            time: dateTime(),
        },
        ['text']
    );
});
