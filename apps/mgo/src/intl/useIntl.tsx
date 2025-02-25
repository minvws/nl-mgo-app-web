import { createHelpers, type AppIntlShape } from '@minvws/mgo-mgo-intl';
import { useMemo, type ReactNode } from 'react';
import { useIntl as useIntlReact } from 'react-intl';

export function useIntl() {
    const intl = useIntlReact() as AppIntlShape<ReactNode>;
    const helpers = useMemo(() => createHelpers(intl), [intl]);

    return {
        intl,
        ...helpers,
    };
}
