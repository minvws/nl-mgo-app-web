import { faker, testSet, testUiSchemaContext } from '$test';
import { expect } from 'vitest';
import { related } from './related';

testSet(
    'related UI schema group is created successfully',
    () => {
        const data = faker.fhir.observationRelated();
        return related.parse(data);
    },
    (data) => {
        const context = testUiSchemaContext();
        const schema = related.uiSchemaGroup(data, context);
        expect(schema.label).toBe(
            context.formatMessage('r3.zib_laboratory_test_result_observation.related')
        );
    },
    false
);
