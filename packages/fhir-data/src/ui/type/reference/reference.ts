import { isNonNullish } from '@minvws/mgo-mgo-utils';
import { type MgoReference } from '../../../parse/type';
import {
    type MultipleValues,
    type ReferenceValue,
    type UiFunction,
    type WithUiHelperContext,
} from '../../types';

export const reference: WithUiHelperContext<
    UiFunction<MgoReference | MgoReference[], ReferenceValue | MultipleValues>
> =
    ({ formatLabel }) =>
    (label, value) => {
        if (Array.isArray(value)) {
            return {
                label: formatLabel(label, value),
                type: 'MULTIPLE_VALUES',
                display: value.map((x) => x.display).filter(isNonNullish),
            };
        }

        return {
            label: formatLabel(label, value),
            type: 'REFERENCE_VALUE',
            display: value?.display,
            reference: value?.reference,
        };
    };
