import { faker, testSet, testUiSchemaContext } from '$test';
import { expect } from 'vitest';
import { link } from './link';

testSet(
    'link parses successfully',
    faker.fhir.patientLink,
    (data) => {
        const schema = link.parse(data);
        expect(schema).toEqual(
            expect.objectContaining({
                type: data.type,
            })
        );
    },
    false
);

testSet(
    'link UI schema group is created successfully',
    () => {
        const data = faker.fhir.patientLink();
        return link.parse(data);
    },
    (data) => {
        const schema = link.uiSchemaGroup(
            data,
            testUiSchemaContext({
                ignoreMissingTranslations: true,
            })
        );
        expect(schema.label).toBe('nl_core_patient.link');
    },
    false
);
