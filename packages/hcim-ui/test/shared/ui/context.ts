import { createHelpers, type FhirIntlShape, type FhirMessagesIds } from '@minvws/mgo-intl';
import { createTestIntl } from '@minvws/mgo-intl/test/shared';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type UiContext } from '../../../src/context/index.js';

const mockIntl = createTestIntl<string>() as FhirIntlShape;

export const context: ReturnType<typeof createMockFactory<UiContext>> =
    createMockFactory<UiContext>(() => {
        const formatLabel = (label: string, _value: unknown, _fallbackLabel?: FhirMessagesIds) =>
            mockIntl.formatMessage({ id: label as FhirMessagesIds });
        return {
            intl: mockIntl,
            isSummary: false,
            ...createHelpers(mockIntl),
            formatLabel,
            baseProps: (label, value, options = {}) => ({
                id: label,
                label: formatLabel(label, value, options.defaultLabel),
            }),
        };
    });
