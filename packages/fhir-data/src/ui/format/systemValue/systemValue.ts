import { type MgoQuantityProps } from '../../../parse/type';
import { isNullish } from '../../../utils';
import { numberToString } from '../../helpers';
import { type FormatFunction, type WithUiHelperContext } from '../../types';

export const systemValue: WithUiHelperContext<FormatFunction<MgoQuantityProps>> =
    ({ formatMessage, hasMessage }) =>
    (value) => {
        if (isNullish(value)) return;
        const { system, code, value: quantityValue, unit } = value;
        const countI18nKey = `system.value.${system}|${code}`;
        if (hasMessage(countI18nKey)) {
            return formatMessage(countI18nKey, { value: quantityValue as number });
        }

        if (unit) {
            return `${numberToString(quantityValue)} ${unit}`;
        }

        return numberToString(quantityValue);
    };
