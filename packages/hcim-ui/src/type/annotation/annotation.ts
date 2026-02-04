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
    ({ baseProps }) =>
    (label, value, options = {}) => {
        if (Array.isArray(value)) {
            return {
                ...baseProps(label, value, options),
                type: 'MULTIPLE_VALUES',
                value: value.map(annotationDisplay).filter(isNonNullish),
            };
        }

        return {
            ...baseProps(label, value, options),
            value: annotationDisplay(value),
            type: 'SINGLE_VALUE',
        };
    };
