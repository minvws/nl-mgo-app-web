import { faker, testSet } from '$test';
import { expect } from 'vitest';
import { stage } from './stage';

testSet(
    'stage UI schema group is created successfully',
    () => {
        const data = faker.fhir.conditionStage();
        return stage.parse(data);
    },
    (data) => {
        const schema = stage.uiSchemaGroup(data);
        expect(schema.label).toBe('stage');
    },
    false
);
