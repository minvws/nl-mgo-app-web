import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { related } from './related';

test('related UI schema group is created successfully', () => {
    const data = related.parse(faker.fhir.observationRelated());
    const context = testUiSchemaContext();
    const schema = related.uiSchemaGroup(data, context);
    expect(schema.label).toBe(
        context.formatMessage('r3.zib_laboratory_test_result_observation.related')
    );
});
