import { type StringKeys } from '$/types/StringKeys';
import { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { type Description, createDescriptions } from './createDescriptions';

export function useTranslatedDescriptions<T extends object>(values: T[], order: StringKeys<T>[]) {
    const intl = useIntl();

    const translateDescription = useCallback(
        ({ term, details, ...rest }: Description) => ({
            term: intl.formatMessage(term),
            details: details ?? intl.formatMessage({ id: 'common.unknown' }),
            ...rest,
        }),
        [intl]
    );

    const results = useMemo(
        () =>
            values.map((x) => ({
                value: x,
                descriptions: createDescriptions(x, order).map(translateDescription),
            })),
        [values, order, translateDescription]
    );

    return { results };
}
