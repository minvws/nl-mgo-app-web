import { type MgoTime } from '@minvws/mgo-hcim-parse';
import { isNonNullish } from '@minvws/mgo-utils';
import { valueOf } from '../../helpers/valueOf/valueOf';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiContext,
} from '../../types';

export const time: WithUiContext<UiFunction<MgoTime | MgoTime[], SingleValue | MultipleValues>> =
    (context) =>
    (label, value, options = {}) => {
        const { formatLabel } = context;

        if (Array.isArray(value)) {
            return {
                label: formatLabel(label, value, options.defaultLabel),
                type: 'MULTIPLE_VALUES',
                display: value.map(valueOf).filter(isNonNullish),
            };
        }

        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: 'SINGLE_VALUE',
            display: valueOf(value),
        };
    };
