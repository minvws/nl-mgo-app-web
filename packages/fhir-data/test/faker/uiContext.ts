import { type IntlShape, type MessageDescriptor } from '@formatjs/intl';
import { vi } from 'vitest';
import { type MessagesIds } from '../../src/i18n/messages';
import { type HasMessageHelper, type UiHelperContext } from '../../src/ui/types';
import { createMockDataFactory } from './factory';

const mockIntl = {
    locale: 'test',
    formatMessage: vi.fn((value: MessageDescriptor) => `intl(${value.id})`),
} satisfies Partial<IntlShape>;

export const uiContext = createMockDataFactory<UiHelperContext>(() => {
    return {
        intl: mockIntl as unknown as IntlShape,
        formatMessage: (id: MessagesIds, _values: unknown) => mockIntl.formatMessage({ id }),
        hasMessage: vi.fn(() => true) as unknown as HasMessageHelper,
    };
});
