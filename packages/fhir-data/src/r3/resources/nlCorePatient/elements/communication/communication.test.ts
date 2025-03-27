import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { parse } from '../../../../../parse';
import { communication } from './communication';

test('communication parses successfully', () => {
    const data = faker.fhir.patientCommunication();
    const schema = communication.parse(data);
    expect(schema).toEqual(
        expect.objectContaining({
            preferred: parse.boolean(data.preferred),
        })
    );
});

test('communication UI schema group is created successfully', () => {
    const data = communication.parse(faker.fhir.patientCommunication());
    const schema = communication.uiSchemaGroup(
        data,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(schema.label).toBe('r3.nl_core_patient.communication');
});
