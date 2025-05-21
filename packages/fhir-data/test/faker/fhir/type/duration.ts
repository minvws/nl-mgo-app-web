import { type Duration } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { quantity } from './quantity';

export const duration = createMockDataFactory<Duration>(quantity);
