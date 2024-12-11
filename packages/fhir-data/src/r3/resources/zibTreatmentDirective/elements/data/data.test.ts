import { faker, testSet, testUiSchemaContext } from '$test';
import { expect } from 'vitest';
import { parse } from '../../../../../parse';
import { data } from './data';

testSet(
    'parses successfully',
    faker.fhir.consentData,
    (value) => {
        const schema = data.parse(value);
        expect(schema).toEqual(
            expect.objectContaining({
                reference: parse.reference(value.reference),
            })
        );
    },
    false
);

testSet(
    'UI schema group is created successfully',
    () => {
        const value = faker.fhir.consentData();
        return data.parse(value);
    },
    (value) => {
        const schema = data.uiSchemaGroup(
            value,
            testUiSchemaContext({
                ignoreMissingTranslations: true,
            })
        );
        expect(schema.label).toBe('zib_treatment_directive.data');
    },
    false
);
