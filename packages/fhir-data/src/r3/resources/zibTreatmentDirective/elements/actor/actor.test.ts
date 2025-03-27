import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { parse } from '../../../../../parse';
import { actor } from './actor';

test('parses successfully', () => {
    const data = faker.fhir.consentActor();
    const schema = actor.parse(data);
    expect(schema).toEqual(
        expect.objectContaining({
            reference: parse.reference(data.reference),
        })
    );
});

test('UI schema group is created successfully', () => {
    const data = actor.parse(faker.fhir.consentActor());
    const schema = actor.uiSchemaGroup(
        data,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(schema.label).toBe('r3.zib_treatment_directive.actor');
});
