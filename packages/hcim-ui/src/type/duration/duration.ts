import { type MgoDuration } from '@minvws/mgo-hcim-parse';
import { type SingleValue, type UiFunction, type WithUiContext } from '../../types/index.js';
import { quantity } from '../quantity/quantity.js';

export const duration: WithUiContext<UiFunction<MgoDuration, SingleValue>> = quantity;
