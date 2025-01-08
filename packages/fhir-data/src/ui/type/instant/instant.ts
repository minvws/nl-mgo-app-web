import { type MgoInstant } from '../../../parse/type';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiHelperContext,
} from '../../types';
import { dateTime } from '../dateTime/dateTime';

export const instant: WithUiHelperContext<
    UiFunction<MgoInstant | MgoInstant[], SingleValue | MultipleValues>
> = (i18nContext) => (label, value) => {
    return dateTime(i18nContext)(label, value);
};
