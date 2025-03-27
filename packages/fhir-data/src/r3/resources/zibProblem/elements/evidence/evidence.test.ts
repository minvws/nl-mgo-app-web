import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { evidence } from './evidence';

test('evidence parses successfully', () => {
    const data = faker.fhir.conditionEvidence();
    const schema = evidence.parse(data);
    expect(schema.detail).toHaveLength(data.detail?.length ?? 0);
});

test('evidence UI schema group is created successfully', () => {
    const data = evidence.parse(faker.fhir.conditionEvidence());
    const schema = evidence.uiSchemaGroup(
        data,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(schema.label).toBe('r3.evidence');
});
