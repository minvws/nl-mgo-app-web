import { type MgoReference } from '@minvws/mgo-hcim-parse';
import {
    type MultipleValues,
    type ReferenceValue,
    type SingleValue,
    type UiFunction,
    type WithUiContext,
} from '../../types/index.js';

export const reference: WithUiContext<
    UiFunction<MgoReference | MgoReference[], SingleValue | ReferenceValue | MultipleValues>
> =
    ({ formatLabel, isSummary }) =>
    (label, value, options = {}) => {
        if (Array.isArray(value)) {
            return {
                label: formatLabel(label, value, options.defaultLabel),
                type: 'MULTIPLE_VALUES',
                value: value.map((x) => ({ display: x.display })),
            };
        }

        if (isSummary) {
            return {
                label: formatLabel(label, value, options.defaultLabel),
                type: 'SINGLE_VALUE',
                value: { display: value?.display },
            };
        }

        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: 'REFERENCE_VALUE',
            display: value?.display,
            reference: value?.reference,
        };
    };
