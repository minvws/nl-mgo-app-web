/* eslint-disable react-refresh/only-export-components */

import { vi } from 'vitest';

export const useIntl = vi.fn(() => ({
    formatMessage: vi.fn((x) => x.id),
}));

export { IntlProvider, FormattedMessage } from 'react-intl';
