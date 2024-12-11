import { faker, testSet, testUiSchemaContext } from '$test';
import { createMockDataFactory } from '$test/faker/factory';
import { mockOptionalFields } from '$test/faker/helpers';
import { type CoverageGrouping } from 'fhir/r3';
import { expect } from 'vitest';
import { grouping } from './grouping';
import { parse } from '../../../../../parse';

const groupingMock = createMockDataFactory<CoverageGrouping>(() => {
    return mockOptionalFields({
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
    });
});

testSet(
    'grouping parses successfully',
    groupingMock,
    (data) => {
        const schema = grouping.parse(data);
        expect(schema).toEqual(
            expect.objectContaining({
                group: parse.string(data.group),
            })
        );
    },
    false
);

testSet(
    'grouping schema group is created successfully',
    () => {
        const data = groupingMock();
        return grouping.parse(data);
    },
    (data) => {
        const schema = grouping.uiSchemaGroup(
            data,
            testUiSchemaContext({
                ignoreMissingTranslations: true,
            })
        );
        expect(schema.label).toBe('zib_payer.grouping');
    },
    false
);
