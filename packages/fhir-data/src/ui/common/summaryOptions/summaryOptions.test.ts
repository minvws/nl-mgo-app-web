import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoResourceR3 } from '../../../api/resources/resources';
import { summaryOptions } from './summaryOptions';

test('creates a options group for the summary ui schema', () => {
    const uiHelperContext = faker.custom.uiHelperContext();
    const resource = {
        referenceId: 'MedicationStatement/zib-medicationuse-01',
    } as unknown as MgoResourceR3;
    const summaryOptionsGroup = summaryOptions(uiHelperContext, 'r3.zib_medication_use', resource);

    expect(summaryOptionsGroup).toMatchSnapshot();
});
