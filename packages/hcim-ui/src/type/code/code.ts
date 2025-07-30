import { type MgoCode } from '@minvws/mgo-hcim-parse';
import { type FhirMessagesIds } from '@minvws/mgo-intl';
import { isNonNullish, isNullish, type Nullable } from '@minvws/mgo-utils';
import { type UiContext } from '../../context/index.js';
import { valueOf } from '../../helpers/valueOf/valueOf.js';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunctionOptions,
} from '../../types/index.js';

type i18nCode<T extends string | undefined> =
    Extract<FhirMessagesIds, `codes.${string}.${T}`> extends `codes.${infer R}.${T}` ? R : never;

type CodeOptions<T extends string | undefined> = {
    i18nCode: i18nCode<T>;
};

export function code(context: UiContext) {
    const { hasMessage, formatMessage, formatLabel } = context;

    return function <T extends string>(
        label: FhirMessagesIds,
        value: Nullable<MgoCode<T> | MgoCode<T>[]>,
        options?: CodeOptions<T> & UiFunctionOptions
    ): SingleValue | MultipleValues {
        const { i18nCode, defaultLabel } = options ?? {};

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
                label: formatLabel(label, value, defaultLabel),
                type: 'MULTIPLE_VALUES',
                display: value.map(translateCode).filter(isNonNullish),
            };
        }

        return {
            label: formatLabel(label, value, defaultLabel),
            type: 'SINGLE_VALUE',
            display: translateCode(value),
        };
    };
}
