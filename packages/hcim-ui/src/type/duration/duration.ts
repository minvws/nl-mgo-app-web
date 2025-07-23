import { type MgoDuration } from '@minvws/mgo-hcim-parse';
import { type SingleValue, type UiFunction, type WithUiContext } from '../../types';
import { quantity } from '../quantity/quantity';

export const duration: WithUiContext<UiFunction<MgoDuration, SingleValue>> = quantity;
