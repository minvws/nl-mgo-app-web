import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { stage } from './stage';

test('stage UI schema group is created successfully', () => {
    const data = stage.parse(faker.fhir.conditionStage());
    const schema = stage.uiSchemaGroup(
        data,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(schema.label).toBe('r3.stage');
});
