import { faker } from '@faker-js/faker';
import { type Identifier } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { code } from './code.js';
import { codeableConcept } from './codeableConcept.js';
import { period } from './period.js';
import { reference } from './reference.js';

export const identifier = createMockFactory<Identifier>(() => ({
    use: code(['usual', 'official', 'temp', 'secondary'] as const),
    type: codeableConcept(),
    system: faker.internet.url(),
    value: faker.lorem.word(),
    period: period(),
    assigner: reference(),
}));
