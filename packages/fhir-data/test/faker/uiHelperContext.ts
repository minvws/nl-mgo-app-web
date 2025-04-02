import { createHelpers, type FhirIntlShape, type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { createTestIntl } from '@minvws/mgo-mgo-intl/test';
import { type UiHelperContext } from '../../src/ui/context';
import { createMockDataFactory } from './factory';

const mockIntl = createTestIntl<string>() as FhirIntlShape;

export const uiHelperContext = createMockDataFactory<UiHelperContext>(() => {
    return {
        intl: mockIntl,
        isSummary: false,
        ...createHelpers(mockIntl),
        formatLabel: (label: string, _value: unknown) =>
            mockIntl.formatMessage({ id: label as FhirMessagesIds }),
    };
});
