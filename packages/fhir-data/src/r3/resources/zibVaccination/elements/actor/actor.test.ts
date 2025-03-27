import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { parse } from '../../../../../parse';
import { actor } from './actor';

test('actor parses successfully', () => {
    const data = faker.fhir.immunizationPractitioner();
    const schema = actor.parse(data);
    expect(schema).toEqual(
        expect.objectContaining({
            actor: parse.reference(data.actor),
        })
    );
});

test('actor UI schema group is created successfully', () => {
    const data = actor.parse(faker.fhir.immunizationPractitioner());
    const schema = actor.uiSchemaGroup(
        data,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(schema.label).toBe('r3.immunization.practitioner.actor');
});
