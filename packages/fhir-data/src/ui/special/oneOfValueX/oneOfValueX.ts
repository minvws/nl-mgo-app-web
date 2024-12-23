import { type I18nContext } from '../../../i18n';
import { type MessagesIds } from '../../../i18n/messages';
import { type Lossless } from '../../../types/Lossless';
import { type Nullable } from '../../../types/Nullable';
import { capitalizeFirstLetter, isNullish } from '../../../utils';
import { isNonNullish } from '../../../utils/isNonNullish/isNonNullish';
import { getTypes } from '../../type';
import { type UiEntry, type UiEntryOptions } from '../../types';

export const oneOfValueX =
    <T extends object>(context: I18nContext) =>
    (
        label: MessagesIds,
        value: Nullable<Lossless<T>>,
        prefix: string = 'value',
        options?: UiEntryOptions
    ) => {
        if (isNullish(value)) {
            return [] as UiEntry[];
        }

        const typeUiFunctions = getTypes(context);
        let type: keyof typeof typeUiFunctions;
        for (type in typeUiFunctions) {
            const key = `${prefix}${capitalizeFirstLetter(type)}` as keyof Nullable<Lossless<T>>;
            if (key in value && isNonNullish(value[key])) {
                const uiValue = typeUiFunctions[type](label, value[key], options);
                return (Array.isArray(uiValue) ? uiValue : [uiValue]) as UiEntry[];
            }
        }

        return [] as UiEntry[];
    };
