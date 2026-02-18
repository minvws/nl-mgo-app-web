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
    ({ baseProps, isSummary }) =>
    (label, value, options = {}) => {
        if (Array.isArray(value)) {
            return {
                ...baseProps(label, value, options),
                type: 'MULTIPLE_VALUES',
                value: value.map((x) => ({ display: x.display })),
            };
        }

        if (isSummary) {
            return {
                ...baseProps(label, value, options),
                type: 'SINGLE_VALUE',
                value: { display: value?.display },
            };
        }

        return {
            ...baseProps(label, value, options),
            type: 'REFERENCE_VALUE',
            display: value?.display,
            reference: value?.reference,
        };
    };
