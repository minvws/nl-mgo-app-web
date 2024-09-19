import { faker, testSet } from '$test';
import { expect } from 'vitest';
import { evidence } from './evidence';

testSet(
    'evidence parses successfully',
    faker.fhir.conditionEvidence,
    (data) => {
        const schema = evidence.parse(data);
        expect(schema.detail).toHaveLength(data.detail?.length ?? 0);
    },
    false
);

testSet(
    'evidence UI schema group is created successfully',
    () => {
        const data = faker.fhir.conditionEvidence();
        return evidence.parse(data);
    },
    (data) => {
        const schema = evidence.uiSchemaGroup(data);
        expect(schema.label).toBe('evidence');
    },
    false
);
