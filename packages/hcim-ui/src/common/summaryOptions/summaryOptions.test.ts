import { faker } from '$test';
import { type MgoResourceMeta } from '@minvws/mgo-hcim-parse';
import { expect, test } from 'vitest';
import { summaryOptions } from './summaryOptions.js';

test('creates a options group for the summary ui schema', () => {
    const uiHelperContext = faker.ui.context();
    const resource = {
        referenceId: 'MedicationStatement/zib-medicationuse-01',
    } as unknown as MgoResourceMeta;
    const summaryOptionsGroup = summaryOptions(uiHelperContext, 'r3.zib_medication_use', resource);

    expect(summaryOptionsGroup).toMatchSnapshot();
});
