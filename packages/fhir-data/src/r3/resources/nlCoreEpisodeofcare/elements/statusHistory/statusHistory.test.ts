import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { parse } from '../../../../../parse';
import { statusHistory } from './statusHistory';

test('statusHistory parses successfully', () => {
    const data = faker.fhir.episodeOfCareStatusHistory();
    const schema = statusHistory.parse(data);
    expect(schema).toEqual(
        expect.objectContaining({
            status: parse.code(data.status),
            period: parse.period(data.period),
        })
    );
});

test('statusHistory UI schema group is created successfully', () => {
    const data = statusHistory.parse(faker.fhir.episodeOfCareStatusHistory());
    const schema = statusHistory.uiSchemaGroup(
        data,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(schema.label).toBe('r3.nl_core_episodeofcare.status_history');
});
