import { type IntlShape, type MessageDescriptor } from '@formatjs/intl';
import { vi } from 'vitest';
import { type MessagesIds } from '../../src/i18n/messages';
import { type HasMessageHelper } from '../../src/ui/types';
import { createMockDataFactory } from './factory';
import { type I18nContext } from '../../src/i18n';

const mockIntl = {
    locale: 'test',
    formatMessage: vi.fn((value: MessageDescriptor) => `intl(${value.id})`),
} satisfies Partial<IntlShape>;

export const i18nContext = createMockDataFactory<I18nContext>(() => {
    return {
        intl: mockIntl as unknown as IntlShape,
        formatMessage: (id: MessagesIds, _values: unknown) => mockIntl.formatMessage({ id }),
        hasMessage: vi.fn(() => true) as unknown as HasMessageHelper,
    };
});
