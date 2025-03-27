import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { container } from './container';

test('container UI schema group is created successfully', () => {
    const data = container.parse(faker.fhir.specimenContainer());
    const schema = container.uiSchemaGroup(
        data,
        testUiSchemaContext({ ignoreMissingTranslations: true })
    );
    expect(schema.label).toBe('r3.zib_laboratory_test_result_specimen_isolate.container');
});
