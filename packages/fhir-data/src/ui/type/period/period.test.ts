import { faker } from '$test';
import { type Mock, expect, test } from 'vitest';
import { type MgoPeriod } from '../../../parse/type';
import { date } from '../../format/date/date';
import { period } from './period';

test('period, defaults to fhir.start/end labels', () => {
    const label = faker.custom.messageId();

    const mgoPeriod: MgoPeriod = {
        start: faker.fhir.dateTime(),
        end: faker.fhir.dateTime(),
    };
    const context = faker.custom.uiHelperContext();
    (context.hasMessage as unknown as Mock).mockImplementation(() => false);
    const formatDateTime = date(context);
    const uiPeriod = period(context);
    const result = uiPeriod(label as any, mgoPeriod); // eslint-disable-line @typescript-eslint/no-explicit-any

    expect(result).toEqual([
        {
            label: `intl(fhir.period.start)`,
            type: `SINGLE_VALUE`,
            display: formatDateTime(mgoPeriod.start),
        },
        {
            label: `intl(fhir.period.end)`,
            type: `SINGLE_VALUE`,
            display: formatDateTime(mgoPeriod.end),
        },
    ]);
});

test('period, uses custom labels if available', () => {
    const label = faker.custom.messageId();

    const mgoPeriod: MgoPeriod = {
        start: faker.fhir.dateTime(),
        end: faker.fhir.dateTime(),
    };
    const context = faker.custom.uiHelperContext();
    (context.hasMessage as unknown as Mock).mockImplementation(() => true);
    const formatDateTime = date(context);
    const uiPeriod = period(context);
    const result = uiPeriod(label as any, mgoPeriod); // eslint-disable-line @typescript-eslint/no-explicit-any

    expect(result).toEqual([
        {
            label: `intl(${label}.start)`,
            type: `SINGLE_VALUE`,
            display: formatDateTime(mgoPeriod.start),
        },
        {
            label: `intl(${label}.end)`,
            type: `SINGLE_VALUE`,
            display: formatDateTime(mgoPeriod.end),
        },
    ]);
});
