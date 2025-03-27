import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { type MgoCode } from '../../../parse/type';
import { type Nullable } from '../../../types/Nullable';
import { isNonNullish, isNullish } from '../../../utils';
import { type UiHelperContext } from '../../context';
import { valueOf } from '../../helpers/valueOf/valueOf';
import { type MultipleValues, type SingleValue } from '../../types';

type i18nCode<T extends string | undefined> =
    Extract<FhirMessagesIds, `codes.${string}.${T}`> extends `codes.${infer R}.${T}` ? R : never;

type CodeOptions<T extends string | undefined> = {
    i18nCode: i18nCode<T>;
};

export function code(context: UiHelperContext) {
    const { hasMessage, formatMessage } = context;

    return function <T extends string>(
        label: FhirMessagesIds,
        value: Nullable<MgoCode<T> | MgoCode<T>[]>,
        options?: CodeOptions<T>
    ): SingleValue | MultipleValues {
        const { i18nCode } = options ?? {};

        function translateCode(code: Nullable<MgoCode<T>>) {
            const codeValue = valueOf(code);
            const i18nKey = `codes.${i18nCode}.${codeValue}`;
            if (isNullish(codeValue)) {
                return;
            }
            if (i18nCode && hasMessage(i18nKey)) {
                return formatMessage(i18nKey);
            }
            return codeValue;
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
