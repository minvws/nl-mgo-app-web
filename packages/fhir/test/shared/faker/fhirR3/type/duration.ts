import { type Duration } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { quantity } from './quantity.js';

export const duration = createMockFactory<Duration>(quantity);
