import { type MgoCodeableConcept } from '@minvws/mgo-hcim-parse';
import { isNonNullish, Nullable } from '@minvws/mgo-utils';
import {
    type MultipleGroupedValues,
    type MultipleValues,
    type UiFunction,
    type WithUiContext,
} from '../../types/index.js';
import { codingToDisplay } from '../coding/coding.js';

export const codeableConcept: WithUiContext<
    UiFunction<MgoCodeableConcept | MgoCodeableConcept[], MultipleValues | MultipleGroupedValues>
> =
    (context) =>
    (label, value, options = {}) => {
        const { baseProps } = context;
        const formatCoding = codingToDisplay(context);
        const formatCodeableConcept = (value: Nullable<MgoCodeableConcept>) => {
            return value?.coding.map(formatCoding);
        };

        if (Array.isArray(value)) {
            return {
                ...baseProps(label, value, options),
                type: 'MULTIPLE_GROUPED_VALUES',
                value: value.map(formatCodeableConcept).filter(isNonNullish),
            };
        }

        return {
            ...baseProps(label, value, options),
            type: 'MULTIPLE_VALUES',
            value: formatCodeableConcept(value),
        };
    };
