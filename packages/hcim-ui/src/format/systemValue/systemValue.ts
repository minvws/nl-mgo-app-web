import { type MgoSimpleQuantityProps } from '@minvws/mgo-hcim-parse';
import { isNullish } from '@minvws/mgo-utils';
import { numberToString } from '../../helpers/index.js';
import { type FormatFunction, type WithUiContext } from '../../types/index.js';

export const systemValue: WithUiContext<FormatFunction<MgoSimpleQuantityProps>> =
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
