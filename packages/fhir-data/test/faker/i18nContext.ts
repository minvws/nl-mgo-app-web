import { type IntlShape, type MessageDescriptor } from '@formatjs/intl';
import { vi } from 'vitest';
import { Locale } from '../../src/i18n/intl/intl';
import { type MessagesIds } from '../../src/i18n/messages';
import { type UiHelperContext } from '../../src/ui/context/ui';
import { type HasMessageHelper } from '../../src/ui/types';
import { createMockDataFactory } from './factory';

const mockIntl = {
    locale: Locale.NL_NL,
    formatMessage: vi.fn((value: MessageDescriptor) => `intl(${value.id})`),
} satisfies Partial<IntlShape>;

export const uiHelperContext = createMockDataFactory<UiHelperContext>(() => {
    return {
        intl: mockIntl as unknown as IntlShape,
        formatMessage: (id: MessagesIds, _values: unknown) => mockIntl.formatMessage({ id }),
        hasMessage: vi.fn(() => false) as unknown as HasMessageHelper,
        isSummary: false,
    };
});
