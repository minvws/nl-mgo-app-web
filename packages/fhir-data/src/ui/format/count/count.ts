import { type MgoQuantity } from '../../../parse/type';
import { isNullish } from '../../../utils';
import { numberToString } from '../../helpers';
import { type FormatFunction, type WithUiHelperContext } from '../../types';

export const count: WithUiHelperContext<FormatFunction<MgoQuantity>> =
    ({ formatMessage, hasMessage }) =>
    (value) => {
        if (isNullish(value)) return;
        const { system, code, value: count, unit } = value;
        const countI18nKey = `system.count.${system}|${code}`;
        if (hasMessage(countI18nKey)) {
            return formatMessage(countI18nKey, { count: count as number });
        }

        if (unit) {
            return `${numberToString(count)} ${unit}`;
        }

        return numberToString(count);
    };
