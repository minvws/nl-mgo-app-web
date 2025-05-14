import { isNonNullish, type Nullable } from '@minvws/mgo-mgo-utils';
import { type MgoAnnotation } from '../../../parse/type';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiHelperContext,
} from '../../types';

export const annotationDisplay = (value: Nullable<MgoAnnotation>) => {
    return value?.text;
};

export const annotation: WithUiHelperContext<
    UiFunction<MgoAnnotation | MgoAnnotation[], SingleValue | MultipleValues>
> =
    ({ formatLabel }) =>
    (label, value, options = {}) => {
        if (Array.isArray(value)) {
            return {
                label: formatLabel(label, value, options.defaultLabel),
                type: 'MULTIPLE_VALUES',
                display: value.map(annotationDisplay).filter(isNonNullish),
            };
        }

        return {
            label: formatLabel(label, value, options.defaultLabel),
            display: annotationDisplay(value),
            type: 'SINGLE_VALUE',
        };
    };
