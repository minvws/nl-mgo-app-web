import { faker, testSet, testUiSchemaContext } from '$test';
import { expect } from 'vitest';
import { statusHistory } from './statusHistory';

testSet(
    'statusHistory parses successfully',
    faker.fhir.episodeOfCareStatusHistory,
    (data) => {
        const schema = statusHistory.parse(data);
        expect(schema).toEqual(
            expect.objectContaining({
                status: data.status,
                period: data.period,
            })
        );
    },
    false
);

testSet(
    'statusHistory UI schema group is created successfully',
    () => {
        const data = faker.fhir.episodeOfCareStatusHistory();
        return statusHistory.parse(data);
    },
    (data) => {
        const schema = statusHistory.uiSchemaGroup(
            data,
            testUiSchemaContext({
                ignoreMissingTranslations: true,
            })
        );
        expect(schema.label).toBe('r3.nl_core_episodeofcare.status_history');
    },
    false
);
