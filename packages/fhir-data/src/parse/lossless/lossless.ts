import { parse, stringify } from 'lossless-json';
import { type LosslessJson } from '../../types/Lossless';

/**
 * Prevent loss of precision when parsing JSON numbers.
 * @see https://www.hl7.org/fhir/json.html#primitive
 */
export function losslessParse<T = Record<string, unknown>>(text: string): LosslessJson<T> {
    if (typeof text !== 'string') {
        throw new Error('Input is not a (JSON) string');
    }

    return parse(text) as LosslessJson<T>;
}

export function losslessStringify<T extends LosslessJson>(value: T, format: boolean = false) {
    if (format) {
        return stringify(value, null, 2);
    }
    return stringify(value);
}
