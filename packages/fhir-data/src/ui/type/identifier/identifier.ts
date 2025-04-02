import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { type MgoIdentifier } from '../../../parse/type';
import { isNonNullish } from '../../../utils';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiHelperContext,
} from '../../types';

export const identifier: WithUiHelperContext<
    UiFunction<MgoIdentifier | MgoIdentifier[], SingleValue | MultipleValues, FhirMessagesIds>
> =
    ({ hasMessage, formatMessage }) =>
    (label, value) => {
        label = hasMessage(label) ? label : `fhir.identifier`;

        if (Array.isArray(value)) {
            return {
                label: formatMessage(label),
                type: 'MULTIPLE_VALUES',
                display: value?.map((x) => x?.value).filter(isNonNullish),
            };
        }
        return {
            label: formatMessage(label),
            type: 'SINGLE_VALUE',
            display: value?.value,
        };
    };
