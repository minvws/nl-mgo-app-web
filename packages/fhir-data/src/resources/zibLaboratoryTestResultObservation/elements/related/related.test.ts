import { faker, testSet } from '$test';
import { expect } from 'vitest';
import { related } from './related';

testSet(
    'related UI schema group is created successfully',
    () => {
        const data = faker.fhir.observationRelated();
        return related.parse(data);
    },
    (data) => {
        const schema = related.uiSchemaGroup(data);
        expect(schema.label).toBe('zib_laboratory_test_result_observation.related');
    },
    false
);
