import { faker, testSet } from '$test';
import { expect } from 'vitest';
import { uiSchemaGroup } from './uiSchemaGroup';
import { zibInstructionsForUse } from './zibInstructionsForUse';

testSet(
    'zibInstructionsForUse schema group is created successfully',
    () => {
        const data = faker.fhir.dosage();
        return zibInstructionsForUse(data);
    },
    (data) => {
        const schema = uiSchemaGroup(data);
        expect(schema.label).toBe('zib_instructions_for_use.group');
    },
    false
);
