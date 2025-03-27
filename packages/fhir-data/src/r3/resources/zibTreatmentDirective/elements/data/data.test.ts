import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { parse } from '../../../../../parse';
import { data } from './data';

test('parses successfully', () => {
    const value = faker.fhir.consentData();
    const schema = data.parse(value);
    expect(schema).toEqual(
        expect.objectContaining({
            reference: parse.reference(value.reference),
        })
    );
});

test('UI schema group is created successfully', () => {
    const value = data.parse(faker.fhir.consentData());
    const schema = data.uiSchemaGroup(
        value,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(schema.label).toBe('r3.zib_treatment_directive.data');
});
