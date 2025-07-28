import { type MgoIdentifier } from '@minvws/mgo-hcim-parse';
import { type FhirMessagesIds } from '@minvws/mgo-intl';
import { isNonNullish } from '@minvws/mgo-utils';
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
                display: value?.map((x) => x?.value).filter(isNonNullish),
            };
        }
        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: 'SINGLE_VALUE',
            display: value?.value,
        };
    };
