import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoPeriod } from '../../../parse/type';
import { format } from '../../format';
import * as general from './period';

test('period', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const mgoPeriod: MgoPeriod = {
        start: faker.fhir.dateTime(),
        end: faker.fhir.dateTime(),
    };
    const result = general.period(label, mgoPeriod, options);
    expect(result).toEqual([
        {
            label: `${label}.start`,
            type: `SINGLE_VALUE`,
            display: format.dateTime(mgoPeriod.start),
            ...options,
        },
        {
            label: `${label}.end`,
            type: `SINGLE_VALUE`,
            display: format.dateTime(mgoPeriod.end),
            ...options,
        },
    ]);
});
