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
    ({ formatLabel }) =>
    (label, value, options = {}) => {
        if (Array.isArray(value)) {
            return {
                label: formatLabel(label, value, options.defaultLabel),
                type: 'MULTIPLE_VALUES',
                value: value.map((x) => ({ display: x?.value })),
            };
        }
        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: 'SINGLE_VALUE',
            value: { display: value?.value },
        };
    };
