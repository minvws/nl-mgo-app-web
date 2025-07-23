import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type Duration } from 'fhir/r3';
import { quantity } from './quantity.js';

export const duration = createMockFactory<Duration>(quantity);
