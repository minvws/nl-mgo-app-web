import { type I18nContext } from '../../../i18n';
import { type MessagesIds } from '../../../i18n/messages';
import { type Lossless } from '../../../types/Lossless';
import { type Nullable } from '../../../types/Nullable';
import { isNonNullish } from '../../../utils/isNonNullish/isNonNullish';
import {
    type MultipleGroupedValues,
    type MultipleValues,
    type ReferenceValue,
    type SingleValue,
    type UiEntryOptions,
    type UiFunction,
} from '../../types';

export const multipleValues =
    ({ intl }: I18nContext) =>
    <T, R extends SingleValue | ReferenceValue | MultipleValues>(
        label: MessagesIds,
        value: Nullable<Lossless<T>[]>,
        parse: UiFunction<T, R>,
        options?: UiEntryOptions
    ) => {
        let display = undefined;

        if (isNonNullish(value)) {
            const entries = value.map((x) => parse(label, x));
            display = entries.map((x) => x.display).filter(isNonNullish);
        }

        return {
            label: intl.formatMessage({ id: label }),
            type: Array.isArray(display?.[0]) ? 'MULTIPLE_GROUPED_VALUES' : 'MULTIPLE_VALUES',
            display,
            ...options,
        } as R extends SingleValue ? MultipleValues : MultipleGroupedValues;
    };
