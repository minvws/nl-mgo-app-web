import { faker, testSet, testUiSchemaContext } from '$test';
import { expect } from 'vitest';
import { container } from './container';

testSet(
    'container UI schema group is created successfully',
    () => {
        const data = faker.fhir.specimenContainer();
        return container.parse(data);
    },
    (data) => {
        const schema = container.uiSchemaGroup(
            data,
            testUiSchemaContext({ ignoreMissingTranslations: true })
        );
        expect(schema.label).toBe('zib_laboratory_test_result_specimen.container');
    },
    false
);
