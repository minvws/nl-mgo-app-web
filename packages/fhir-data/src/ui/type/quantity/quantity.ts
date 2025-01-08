import { type MgoQuantity } from '../../../parse/type';
import { format } from '../../format';
import { type SingleValue, type UiFunction, type WithUiHelperContext } from '../../types';

export const quantity: WithUiHelperContext<UiFunction<MgoQuantity, SingleValue>> =
    ({ formatMessage }) =>
    (label, value) => {
        const { value: quantityValue, unit } = value ?? {};

        return {
            label: formatMessage(label),
            type: `SINGLE_VALUE`,
            display: format.valueWithUnit(quantityValue, unit),
        };
    };
