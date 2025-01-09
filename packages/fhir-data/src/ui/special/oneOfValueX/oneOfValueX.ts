import { type MessagesIds } from '../../../i18n/messages';
import { type Lossless } from '../../../types/Lossless';
import { type Nullable } from '../../../types/Nullable';
import { capitalizeFirstLetter, isNullish } from '../../../utils';
import { isNonNullish } from '../../../utils/isNonNullish/isNonNullish';
import { type UiHelperContext } from '../../context/ui';
import { getTypes } from '../../type';
import { type UiElement } from '../../types';

export const oneOfValueX =
    <T extends object>(context: UiHelperContext) =>
    (label: MessagesIds, value: Nullable<Lossless<T>>, prefix: string = 'value') => {
        if (isNullish(value)) {
            return [] as UiElement[];
        }

        const typeUiFunctions = getTypes(context);
        let type: keyof typeof typeUiFunctions;

        for (type in typeUiFunctions) {
            const key = `${prefix}${capitalizeFirstLetter(type)}` as keyof Lossless<T>;
            if (key in value && isNonNullish(value[key])) {
                const uiValue = typeUiFunctions[type](label, value[key] as any); // eslint-disable-line @typescript-eslint/no-explicit-any
                return (Array.isArray(uiValue) ? uiValue : [uiValue]) as UiElement[];
            }
        }

        return [] as UiElement[];
    };
