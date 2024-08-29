import { type Duration } from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';
import { quantity } from './quantity';

export const duration = createMockDataFactory<Duration>(quantity);
