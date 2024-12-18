import { faker, testSet, testUiSchemaContext } from '$test';
import { expect } from 'vitest';
import { parse } from '../../../../../parse';
import { actor } from './actor';

testSet(
    'parses successfully',
    faker.fhir.consentActor,
    (data) => {
        const schema = actor.parse(data);
        expect(schema).toEqual(
            expect.objectContaining({
                reference: parse.reference(data.reference),
            })
        );
    },
    false
);

testSet(
    'UI schema group is created successfully',
    () => {
        const data = faker.fhir.consentActor();
        return actor.parse(data);
    },
    (data) => {
        const schema = actor.uiSchemaGroup(
            data,
            testUiSchemaContext({
                ignoreMissingTranslations: true,
            })
        );
        expect(schema.label).toBe('r3.zib_treatment_directive.actor');
    },
    false
);
