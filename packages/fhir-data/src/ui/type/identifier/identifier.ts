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
    ({ formatLabel }) =>
    (label, value) => {
        if (Array.isArray(value)) {
            return {
                label: formatLabel(label, value),
                type: 'MULTIPLE_VALUES',
                display: value?.map((x) => x?.value).filter(isNonNullish),
            };
        }
        return {
            label: formatLabel(label, value),
            type: 'SINGLE_VALUE',
            display: value?.value,
        };
    };
