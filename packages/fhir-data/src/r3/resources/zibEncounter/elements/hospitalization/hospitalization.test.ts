import { faker, testSet, testUiSchemaContext } from '$test';
import { expect } from 'vitest';
import { hospitalization } from './hospitalization';

testSet(
    'hospitalization UI schema group is created successfully',
    () => {
        const data = faker.fhir.encounterHospitalization();
        return hospitalization.parse(data);
    },
    (data) => {
        const schema = hospitalization.uiSchemaGroup(
            data,
            testUiSchemaContext({
                ignoreMissingTranslations: true,
            })
        );
        expect(schema.label).toBe('Encounter.hospitalization');
    },
    false
);
