import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { hospitalization } from './hospitalization';

test('hospitalization UI schema group is created successfully', () => {
    const data = hospitalization.parse(faker.fhir.encounterHospitalization());
    const schema = hospitalization.uiSchemaGroup(
        data,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(schema.label).toBe('Encounter.hospitalization');
});
