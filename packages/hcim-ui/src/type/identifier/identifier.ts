import { type MgoIdentifier } from '@minvws/mgo-hcim-parse';
import { type FhirMessagesIds } from '@minvws/mgo-intl';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiContext,
} from '../../types/index.js';

export const identifier: WithUiContext<
    UiFunction<MgoIdentifier | MgoIdentifier[], SingleValue | MultipleValues, FhirMessagesIds>
> =
    ({ baseProps }) =>
    (label, value, options = {}) => {
        if (Array.isArray(value)) {
            return {
                ...baseProps(label, value, options),
                type: 'MULTIPLE_VALUES',
                value: value.map((x) => ({ display: x?.value })),
            };
        }
        return {
            ...baseProps(label, value, options),
            type: 'SINGLE_VALUE',
            value: { display: value?.value },
        };
    };
