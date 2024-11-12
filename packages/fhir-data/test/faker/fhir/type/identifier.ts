import { faker } from '@faker-js/faker';
import { type Identifier } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { mockOptionalFields } from '../../helpers';
import * as special from './reference';
import { code } from './code';
import { codeableConcept } from './codeableConcept';
import { period } from './period';

export const identifier = createMockDataFactory<Identifier>(() => {
    return mockOptionalFields({
        use: code(['usual', 'official', 'temp', 'secondary']),
        type: codeableConcept(),
        system: faker.internet.url(),
        value: faker.lorem.word(),
        period: period(),
        assigner: special.reference(),
    });
});
