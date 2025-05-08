import { isNonNullish } from '@minvws/mgo-mgo-utils';
import { type MgoTime } from '../../../parse/type';
import { valueOf } from '../../helpers/valueOf/valueOf';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiHelperContext,
} from '../../types';

export const time: WithUiHelperContext<
    UiFunction<MgoTime | MgoTime[], SingleValue | MultipleValues>
> = (context) => (label, value) => {
    const { formatLabel } = context;

    if (Array.isArray(value)) {
        return {
            label: formatLabel(label, value),
            type: 'MULTIPLE_VALUES',
            display: value.map(valueOf).filter(isNonNullish),
        };
    }

    return {
        label: formatLabel(label, value),
        type: 'SINGLE_VALUE',
        display: valueOf(value),
    };
};
