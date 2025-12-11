import { type MgoAnnotation } from '@minvws/mgo-hcim-parse';
import { isNonNullish, type Nullable } from '@minvws/mgo-utils';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiContext,
} from '../../types/index.js';

export const annotationDisplay = (value: Nullable<MgoAnnotation>) => {
    return {
        display: value?.text,
    };
};

export const annotation: WithUiContext<
    UiFunction<MgoAnnotation | MgoAnnotation[], SingleValue | MultipleValues>
> =
    ({ formatLabel }) =>
    (label, value, options = {}) => {
        if (Array.isArray(value)) {
            return {
                label: formatLabel(label, value, options.defaultLabel),
                type: 'MULTIPLE_VALUES',
                value: value.map(annotationDisplay).filter(isNonNullish),
            };
        }

        return {
            label: formatLabel(label, value, options.defaultLabel),
            value: annotationDisplay(value),
            type: 'SINGLE_VALUE',
        };
    };
