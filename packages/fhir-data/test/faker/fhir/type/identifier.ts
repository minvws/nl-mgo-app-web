import { faker } from '@faker-js/faker';
import { type Identifier } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { code } from './code';
import { codeableConcept } from './codeableConcept';
import { period } from './period';
import * as special from './reference';

export const identifier = createMockDataFactory<Identifier>(() => ({
    use: code(['usual', 'official', 'temp', 'secondary'] as const),
    type: codeableConcept(),
    system: faker.internet.url(),
    value: faker.lorem.word(),
    period: period(),
    assigner: special.reference(),
}));
