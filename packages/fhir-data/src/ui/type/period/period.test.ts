import { faker } from '$test';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test, vi } from 'vitest';
import { date } from '../../format/date/date';
import { period } from './period';

test('period, defaults to fhir.start/end labels', () => {
    const label = faker.custom.fhirMessageId();

    const mgoPeriod = faker.mgo.period();
    const context = faker.custom.uiHelperContext();
    vi.spyOn(context, 'formatLabel').mockImplementation(
        (_label, _value, fallbackLabel) => testMessage(fallbackLabel) ?? ''
    );

    const formatDateTime = date(context);
    const uiPeriod = period(context);
    const result = uiPeriod(label as any, mgoPeriod); // eslint-disable-line @typescript-eslint/no-explicit-any

    expect(result).toEqual([
        {
            label: testMessage('fhir.period.start'),
            type: `SINGLE_VALUE`,
            display: formatDateTime(mgoPeriod.start),
        },
        {
            label: testMessage('fhir.period.end'),
            type: `SINGLE_VALUE`,
            display: formatDateTime(mgoPeriod.end),
        },
    ]);
});

test('period, uses custom labels if available', () => {
    const label = faker.custom.fhirMessageId();

    const mgoPeriod = faker.mgo.period();
    const context = faker.custom.uiHelperContext();
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
