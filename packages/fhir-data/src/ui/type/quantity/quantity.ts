import { type MgoQuantity } from '../../../parse/type';
import { format } from '../../format';
import { type SingleValue, type UiFunction, type WithI18nContext } from '../../types';

export const quantity: WithI18nContext<UiFunction<MgoQuantity, SingleValue>> =
    ({ formatMessage }) =>
    (label, value, options) => {
        const { value: quantityValue, unit } = value ?? {};

        return {
            label: formatMessage(label),
            type: `SINGLE_VALUE`,
            display: format.valueWithUnit(quantityValue, unit),
            ...options,
        };
    };
