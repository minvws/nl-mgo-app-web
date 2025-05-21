import { faker } from '$test';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test } from 'vitest';
import { systemValue } from '../../format/systemValue/systemValue';
import { sampledData } from './sampledData';

test('sampled data', () => {
    const label = faker.custom.fhirMessageId();
    const value = faker.mgo.sampledData();
    const uiHelperContext = faker.custom.uiHelperContext();
    const result = sampledData(uiHelperContext)(label, value);

    expect(result).toEqual({
        label: testMessage(label),
        children: expect.arrayContaining([
            {
                label: testMessage(`${label}.origin`),
                type: `SINGLE_VALUE`,
                display: systemValue(uiHelperContext)(value?.origin),
            },
        ]),
    });
});
