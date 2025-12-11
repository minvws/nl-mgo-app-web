import { AppIntlShape, createHelpers, IntlHelpers, type AppMessagesIds } from '@minvws/mgo-intl';
import { createTestIntl } from '@minvws/mgo-intl/test/shared';
import { ReactNode, useMemo } from 'react';

type IntlHookShape = IntlHelpers<ReactNode, AppMessagesIds> & {
    intl: AppIntlShape<ReactNode>;
};

const intl = createTestIntl<AppMessagesIds>() as AppIntlShape<ReactNode>;

export function useIntl(): IntlHookShape {
    const helpers = useMemo(() => createHelpers(intl), []);

    return {
        intl,
        ...helpers,
    };
}
