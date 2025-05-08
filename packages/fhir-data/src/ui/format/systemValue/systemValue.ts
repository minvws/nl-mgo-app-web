import { isNullish } from '@minvws/mgo-mgo-utils';
import { type MgoSimpleQuantityProps } from '../../../parse/type/simpleQuantity/simpleQuantity';
import { numberToString } from '../../helpers';
import { type FormatFunction, type WithUiHelperContext } from '../../types';

export const systemValue: WithUiHelperContext<FormatFunction<MgoSimpleQuantityProps>> =
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
