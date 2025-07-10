import { isNullish } from '@minvws/mgo-utils';
import { type MgoSimpleQuantityProps } from '../../../parse/type/simpleQuantity/simpleQuantity';
import { numberToString } from '../../helpers';
import { type FormatFunction, type WithUiHelperContext } from '../../types';

export const systemValue: WithUiHelperContext<FormatFunction<MgoSimpleQuantityProps>> =
    ({ formatMessage, hasMessage }) =>
    (value) => {
        if (isNullish(value)) return;
        const { system, code, value: quantityValue, unit } = value;
        const countI18nKey = `system.value.${system}|${code}`;
        const numberString = numberToString(quantityValue);

        if (hasMessage(countI18nKey)) {
            return formatMessage(countI18nKey, { value: numberString });
        }

        if (unit) {
            return `${numberString} ${unit}`;
        }

        return numberString;
    };
