import { faker } from '@faker-js/faker';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type Identifier } from 'fhir/r3';
import { code } from './code';
import { codeableConcept } from './codeableConcept';
import { period } from './period';
import * as special from './reference';

export const identifier = createMockFactory<Identifier>(() => ({
    use: code(['usual', 'official', 'temp', 'secondary'] as const),
    type: codeableConcept(),
    system: faker.internet.url(),
    value: faker.lorem.word(),
    period: period(),
    assigner: special.reference(),
}));
