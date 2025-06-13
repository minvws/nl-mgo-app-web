import {
    AppMessagesIds,
    createHelpers,
    type AppIntlShape,
    type IntlHelpers,
} from '@minvws/mgo-intl';
import { useMemo, type ReactNode } from 'react';
import { useIntl as useIntlReact } from 'react-intl';

type IntlHookShape = IntlHelpers<ReactNode, AppMessagesIds> & {
    intl: AppIntlShape<ReactNode>;
};

export function useIntl(): IntlHookShape {
    const intl = useIntlReact() as AppIntlShape<ReactNode>;
    const helpers = useMemo(() => createHelpers(intl), [intl]);

    return {
        intl,
        ...helpers,
    };
}
