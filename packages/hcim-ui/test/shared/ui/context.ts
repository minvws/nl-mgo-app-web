import { createHelpers, type FhirIntlShape, type FhirMessagesIds } from '@minvws/mgo-intl';
import { createTestIntl } from '@minvws/mgo-intl/test/shared';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type UiContext } from '../../../src/context/index.js';

const mockIntl = createTestIntl<string>() as FhirIntlShape;

export const context: ReturnType<typeof createMockFactory<UiContext>> =
    createMockFactory<UiContext>(() => {
        return {
            intl: mockIntl,
            isSummary: false,
            ...createHelpers(mockIntl),
            formatLabel: (label: string, _value: unknown) =>
                mockIntl.formatMessage({ id: label as FhirMessagesIds }),
        };
    });
