import { faker, testSet, testUiSchemaContext } from '$test';
import { expect } from 'vitest';
import { communication } from './communication';

testSet(
    'communication parses successfully',
    faker.fhir.patientCommunication,
    (data) => {
        const schema = communication.parse(data);
        expect(schema).toEqual(
            expect.objectContaining({
                preferred: data.preferred,
            })
        );
    },
    false
);

testSet(
    'communication UI schema group is created successfully',
    () => {
        const data = faker.fhir.patientCommunication();
        return communication.parse(data);
    },
    (data) => {
        const schema = communication.uiSchemaGroup(
            data,
            testUiSchemaContext({
                ignoreMissingTranslations: true,
            })
        );
        expect(schema.label).toBe('r3.nl_core_patient.communication');
    },
    false
);
