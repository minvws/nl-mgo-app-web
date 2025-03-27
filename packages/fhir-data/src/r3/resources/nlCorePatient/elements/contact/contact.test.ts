import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { parse } from '../../../../../parse';
import { contact } from './contact';

test('contact parses successfully', () => {
    const data = faker.fhir.patientContact();
    const schema = contact.parse(data);
    expect(schema).toEqual(
        expect.objectContaining({
            organization: parse.reference(data.organization),
        })
    );
});

test('contact UI schema group is created successfully', () => {
    const data = contact.parse(faker.fhir.patientContact());
    const schema = contact.uiSchemaGroup(
        data,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(schema.label).toBe('r3.nl_core_patient.contact');
});
