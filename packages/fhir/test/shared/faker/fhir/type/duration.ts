import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type Duration } from 'fhir/r3';
import { quantity } from './quantity';

export const duration = createMockFactory<Duration>(quantity);
