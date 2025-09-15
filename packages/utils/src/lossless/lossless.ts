import { parse, stringify, type LosslessNumber } from 'lossless-json';
import { type DeepReplaceType } from './DeepReplaceType.js';

export type { LosslessNumber };

export type LosslessObject<T = unknown> = DeepReplaceType<T, number, LosslessNumber>;

export type Lossless<T> = T extends number
    ? LosslessNumber
    : T extends object
      ? LosslessObject<T>
      : T;

/**
 * Prevent loss of precision when parsing JSON numbers.
 * @see https://www.hl7.org/fhir/json.html#primitive
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function losslessParse<T = any>(text: string): LosslessObject<T> {
    if (typeof text !== 'string') {
        throw new Error('Input is not a (JSON) string');
    }

    return parse(text) as LosslessObject<T>;
}

export const losslessStringify = stringify;
