import { type LosslessNumber, parse } from 'lossless-json';
import { type DeepReplaceType } from '../../types/replacement';

export type LosslessJson<T> = DeepReplaceType<T, number, LosslessNumber>;

/**
 * Prevent loss of precision when parsing JSON numbers.
 * @see https://www.hl7.org/fhir/json.html#primitive
 */
export function parseJson<T = unknown>(text: string): LosslessJson<T> {
    return parse(text) as LosslessJson<T>;
}
