import { type MgoCodeableConcept } from '@minvws/mgo-hcim-parse';
import { isNonNullish } from '@minvws/mgo-utils';
import { system } from '../../format/system/system.js';
import {
    type FormatDisplayFunction,
    type MultipleGroupedValues,
    type MultipleValues,
    type UiFunction,
    type WithUiContext,
} from '../../types/index.js';

const codeableDisplay: WithUiContext<FormatDisplayFunction<MgoCodeableConcept, string[]>> =
    (context) => (value) => {
        if (value?.text?.length) {
            return [value.text];
        }

        const formatSystem = system(context);
        return value?.coding.map(formatSystem).filter(isNonNullish) ?? [];
    };

export const codeableConcept: WithUiContext<
    UiFunction<MgoCodeableConcept | MgoCodeableConcept[], MultipleValues | MultipleGroupedValues>
> =
    (context) =>
    (label, value, options = {}) => {
        const { formatLabel } = context;
        const display = codeableDisplay(context);

        if (Array.isArray(value)) {
            return {
                label: formatLabel(label, value, options.defaultLabel),
                type: 'MULTIPLE_GROUPED_VALUES',
                display: value.map(display),
            };
        }

        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: 'MULTIPLE_VALUES',
            display: display(value),
        };
    };
