import { MgoCodingProps, type MgoCoding } from '@minvws/mgo-hcim-parse';
import { isNonNullish, Nullable } from '@minvws/mgo-utils';
import { UiContext } from '../../context/index.js';
import { system } from '../../format/system/system.js';
import {
    type DisplayValue,
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiContext,
} from '../../types/index.js';

export const codingToDisplay = (uiContext: UiContext) => {
    const display = system(uiContext);
    return (value: Nullable<MgoCodingProps>): DisplayValue => ({
        display: display(value),
        code: value?.code,
        system: value?.system,
    });
};

export const coding: WithUiContext<
    UiFunction<MgoCoding | MgoCoding[], SingleValue | MultipleValues>
> =
    (context) =>
    (label, value, options = {}) => {
        const { baseProps } = context;
        const formatCoding = codingToDisplay(context);

        if (Array.isArray(value)) {
            return {
                ...baseProps(label, value, options),
                type: 'MULTIPLE_VALUES',
                value: value.map(formatCoding).filter((item) => isNonNullish(item.display)),
            };
        }
        return {
            ...baseProps(label, value, options),
            type: 'SINGLE_VALUE',
            value: formatCoding(value),
        };
    };
