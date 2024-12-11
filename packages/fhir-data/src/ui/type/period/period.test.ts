import { faker } from '$test';
import { type Mock, expect, test } from 'vitest';
import { type MgoPeriod } from '../../../parse/type';
import { format } from '../../format';
import { period } from './period';

test('period', () => {
    const label = faker.custom.messageId();
    const options = faker.custom.uiEntryOptions();
    const mgoPeriod: MgoPeriod = {
        start: faker.fhir.dateTime(),
        end: faker.fhir.dateTime(),
    };
    const context = faker.custom.uiContext();
    (context.hasMessage as unknown as Mock).mockImplementation(() => false);
    const uiPeriod = period(context);
    const result = uiPeriod(label as any, mgoPeriod, options); // eslint-disable-line @typescript-eslint/no-explicit-any
    expect(result).toEqual([
        {
            label: `intl(fhir.period.start)`,
            type: `SINGLE_VALUE`,
            display: format.dateTime(mgoPeriod.start),
            ...options,
        },
        {
            label: `intl(fhir.period.end)`,
            type: `SINGLE_VALUE`,
            display: format.dateTime(mgoPeriod.end),
            ...options,
        },
    ]);
});
