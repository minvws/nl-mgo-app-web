import { faker, testSet, testUiSchemaContext } from '$test';
import { expect } from 'vitest';
import { actor } from './actor';

testSet(
    'actor parses successfully',
    faker.fhir.immunizationPractitioner,
    (data) => {
        const schema = actor.parse(data);
        expect(schema).toEqual(
            expect.objectContaining({
                actor: data.actor,
            })
        );
    },
    false
);

testSet(
    'actor UI schema group is created successfully',
    () => {
        const data = faker.fhir.immunizationPractitioner();
        return actor.parse(data);
    },
    (data) => {
        const schema = actor.uiSchemaGroup(
            data,
            testUiSchemaContext({
                ignoreMissingTranslations: true,
            })
        );
        expect(schema.label).toBe('Immunization.practitioner.actor');
    },
    false
);
