import { faker, testSet, testUiSchemaContext } from '$test';
import { expect } from 'vitest';
import { stage } from './stage';

testSet(
    'stage UI schema group is created successfully',
    () => {
        const data = faker.fhir.conditionStage();
        return stage.parse(data);
    },
    (data) => {
        const schema = stage.uiSchemaGroup(
            data,
            testUiSchemaContext({
                ignoreMissingTranslations: true,
            })
        );
        expect(schema.label).toBe('r3.stage');
    },
    false
);
