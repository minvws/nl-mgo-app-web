import { type MgoIdentifier } from '../../../parse/type';
import { isNonNullish } from '../../../utils';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiHelperContext,
} from '../../types';

export const identifier: WithUiHelperContext<
    UiFunction<MgoIdentifier | MgoIdentifier[], SingleValue | MultipleValues>
> =
    ({ intl }) =>
    (label, value) => {
        if (Array.isArray(value)) {
            return {
                label: intl.formatMessage({ id: label }),
                type: 'MULTIPLE_VALUES',
                display: value?.map((x) => x?.value).filter(isNonNullish),
            };
        }
        return {
            label: intl.formatMessage({ id: label }),
            type: 'SINGLE_VALUE',
            display: value?.value,
        };
    };
