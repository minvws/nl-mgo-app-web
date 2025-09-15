import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import { systemValue } from '../../format/systemValue/systemValue.js';
import { sampledData } from './sampledData.js';

test('sampled data', () => {
    const label = faker.custom.fhirMessageId();
    const value = faker.mgo.sampledData();
    const uiHelperContext = faker.ui.context();
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
