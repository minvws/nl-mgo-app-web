import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { type MgoCode } from '../../../parse/type';
import { type Nullable } from '../../../types/Nullable';
import { isNonNullish, isNullish } from '../../../utils';
import { type UiHelperContext } from '../../context';
import { type MultipleValues, type SingleValue } from '../../types';

type i18nCode<T extends string | undefined> =
    Extract<FhirMessagesIds, `codes.${string}.${T}`> extends `codes.${infer R}.${T}` ? R : never;

type CodeOptions<T extends string | undefined> = {
    i18nCode: i18nCode<T>;
};

export function code(context: UiHelperContext) {
    const { hasMessage, formatMessage } = context;

    return function <T extends MgoCode>(
        label: FhirMessagesIds,
        value: Nullable<T | T[]>,
        options?: CodeOptions<T>
    ): SingleValue | MultipleValues {
        const { i18nCode } = options ?? {};

        function translateCode(code: Nullable<T>) {
            const i18nKey = `codes.${i18nCode}.${code}`;
            if (isNullish(code)) {
                return;
            }
            if (i18nCode && hasMessage(i18nKey)) {
                return formatMessage(i18nKey);
            }
            return code;
        }

        if (Array.isArray(value)) {
            return {
                label: formatMessage(label),
                type: 'MULTIPLE_VALUES',
                display: value.map(translateCode).filter(isNonNullish),
            };
        }

        return {
            label: formatMessage(label),
            type: 'SINGLE_VALUE',
            display: translateCode(value),
        };
    };
}
