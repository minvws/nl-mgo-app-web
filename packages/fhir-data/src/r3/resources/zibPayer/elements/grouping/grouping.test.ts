import { faker, testUiSchemaContext } from '$test';
import { createMockDataFactory } from '$test/faker/factory';
import { type CoverageGrouping } from 'fhir/r3';
import { expect, test } from 'vitest';
import { parse } from '../../../../../parse';
import { grouping } from './grouping';

const groupingMock = createMockDataFactory<CoverageGrouping>(() => ({
    group: faker.lorem.word(),
    groupDisplay: faker.lorem.word(),
    subGroup: faker.lorem.word(),
    subGroupDisplay: faker.lorem.word(),
    plan: faker.lorem.word(),
    planDisplay: faker.lorem.word(),
    subPlan: faker.lorem.word(),
    subPlanDisplay: faker.lorem.word(),
    class: faker.lorem.word(),
    classDisplay: faker.lorem.word(),
    subClass: faker.lorem.word(),
    subClassDisplay: faker.lorem.word(),
}));

test('grouping parses successfully', () => {
    const data = groupingMock();
    const schema = grouping.parse(data);
    expect(schema).toEqual(
        expect.objectContaining({
            group: parse.string(data.group),
        })
    );
});

test('grouping schema group is created successfully', () => {
    const data = grouping.parse(groupingMock());
    const schema = grouping.uiSchemaGroup(
        data,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(schema.label).toBe('r3.zib_payer.grouping');
});
