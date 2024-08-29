import { faker } from '@faker-js/faker';
import { type Timing } from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';
import { collection, mockOptionalFields } from '../../helpers';
import { codeableConcept } from './codeableConcept';
import { timingRepeat } from './timingRepeat';

export const timing = createMockDataFactory<Timing>(() => {
    return mockOptionalFields({
        code: codeableConcept(),
        event: collection({
            factory: faker.lorem.word,
            max: 5,
        }),
        repeat: timingRepeat(),
    });
});
