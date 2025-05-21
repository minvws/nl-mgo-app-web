import { type MgoDuration } from '../../../parse/type';
import { type SingleValue, type UiFunction, type WithUiHelperContext } from '../../types';
import { quantity } from '../quantity/quantity';

export const duration: WithUiHelperContext<UiFunction<MgoDuration, SingleValue>> = quantity;
