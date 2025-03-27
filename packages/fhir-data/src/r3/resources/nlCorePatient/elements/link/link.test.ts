import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { parse } from '../../../../../parse';
import { link } from './link';

test('link parses successfully', () => {
    const data = faker.fhir.patientLink();
    const schema = link.parse(data);
    expect(schema).toEqual(
        expect.objectContaining({
            type: parse.code(data.type),
        })
    );
});

test('link UI schema group is created successfully', () => {
    const data = link.parse(faker.fhir.patientLink());
    const schema = link.uiSchemaGroup(
        data,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(schema.label).toBe('r3.nl_core_patient.link');
});
