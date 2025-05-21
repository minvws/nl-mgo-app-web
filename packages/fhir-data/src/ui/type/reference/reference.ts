import { isNonNullish } from '@minvws/mgo-mgo-utils';
import { type MgoReference } from '../../../parse/type';
import {
    type MultipleValues,
    type ReferenceValue,
    type SingleValue,
    type UiFunction,
    type WithUiHelperContext,
} from '../../types';

export const reference: WithUiHelperContext<
    UiFunction<MgoReference | MgoReference[], SingleValue | ReferenceValue | MultipleValues>
> =
    ({ formatLabel, isSummary }) =>
    (label, value, options = {}) => {
        if (Array.isArray(value)) {
            return {
                label: formatLabel(label, value, options.defaultLabel),
                type: 'MULTIPLE_VALUES',
                display: value.map((x) => x.display).filter(isNonNullish),
            };
        }

        if (isSummary) {
            return {
                label: formatLabel(label, value, options.defaultLabel),
                type: 'SINGLE_VALUE',
                display: value?.display,
            };
        }

        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: 'REFERENCE_VALUE',
            display: value?.display,
            reference: value?.reference,
        };
    };
