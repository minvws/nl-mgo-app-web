import { MgoCodingProps, type MgoCoding } from '@minvws/mgo-hcim-parse';
import { isNonNullish, Nullable } from '@minvws/mgo-utils';
import { UiContext } from 'src/context/index.js';
import { system } from '../../format/system/system.js';
import {
    type DisplayCoding,
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiContext,
} from '../../types/index.js';

export const codingToDisplay = (uiContext: UiContext) => {
    const display = system(uiContext);
    return (value: Nullable<MgoCodingProps>): DisplayCoding => ({
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
        const { formatLabel } = context;
        const formatCoding = codingToDisplay(context);

        if (Array.isArray(value)) {
            return {
                label: formatLabel(label, value, options.defaultLabel),
                type: 'MULTIPLE_VALUES',
                display: value.map(formatCoding).filter((item) => isNonNullish(item.display)),
            };
        }
        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: 'SINGLE_VALUE',
            display: formatCoding(value),
        };
    };
