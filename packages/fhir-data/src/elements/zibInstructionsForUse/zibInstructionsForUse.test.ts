import { faker, testSet } from '$test';
import { expect } from 'vitest';
import { zibInstructionsForUse } from './zibInstructionsForUse';
import { parse } from '../../parse/type';

testSet(
    'zibInstructionsForUse parses successfully',
    faker.fhir.dosage,
    (data) => {
        const schema = zibInstructionsForUse(data);
        expect(schema).toEqual(
            expect.objectContaining({
                asNeeded: parse.codeableConcept(data.asNeededCodeableConcept),
            })
        );
    },
    false
);
