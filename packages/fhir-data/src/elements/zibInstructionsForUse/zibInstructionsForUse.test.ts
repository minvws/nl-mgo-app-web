import { faker, testSet } from '$test';
import { expect } from 'vitest';
import { zibInstructionsForUse } from './zibInstructionsForUse';
import { parse } from '../../parse';

testSet(
    'zibInstructionsForUse parses successfully',
    faker.fhir.dosage,
    (data) => {
        const schema = zibInstructionsForUse.parse(data);
        expect(schema).toEqual(
            expect.objectContaining({
                asNeeded: parse.codeableConcept(data.asNeededCodeableConcept),
            })
        );
    },
    false
);

testSet(
    'zibInstructionsForUse schema group is created successfully',
    () => {
        const data = faker.fhir.dosage();
        return zibInstructionsForUse.parse(data);
    },
    (data) => {
        const schema = zibInstructionsForUse.uiSchemaGroup(data);
        expect(schema.label).toBe('zib_instructions_for_use');
    },
    false
);
