import { type MgoAnnotation } from '../../../parse/type';
import { type Nullable } from '../../../types/Nullable';
import { isNonNullish } from '../../../utils';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiContext,
} from '../../types';

export const annotationDisplay = (value: Nullable<MgoAnnotation>) => {
    return value?.text;
};

export const annotation: WithUiContext<
    UiFunction<MgoAnnotation | MgoAnnotation[], SingleValue | MultipleValues>
> =
    ({ intl }) =>
    (label, value, options) => {
        if (Array.isArray(value)) {
            return {
                label: intl.formatMessage({ id: label }),
                type: 'MULTIPLE_VALUES',
                display: value.map(annotationDisplay).filter(isNonNullish),
                ...options,
            };
        }

        return {
            label: intl.formatMessage({ id: label }),
            display: annotationDisplay(value),
            type: 'SINGLE_VALUE',
            ...options,
        };
    };
