import type { Extension } from '../../../fhir';
import { EMPTY_VALUE } from '../../type/emptyValue';
import { parse } from '../../type';

// https://www.hl7.org/fhir/extensibility.html
const valueXTypeMap = {
    valueBoolean: parse.boolean,
    valueCodeableConcept: parse.codableConcept,
    valueReference: parse.reference,
    valueIdentifier: parse.identifier,
    valueDuration: parse.duration,
    valueString: parse.string,
};

type ConversionMap = typeof valueXTypeMap;
export type ValueX = keyof ConversionMap;
export type ValueXConvertedType<T extends ValueX> = ReturnType<ConversionMap[T]>;
type XElement<T extends keyof Extension> = Pick<Extension, T>;

export function valueX<T extends ValueX>(xKey: T, element?: XElement<T>) {
    const conversion = valueXTypeMap[xKey];
    const value = element?.[xKey] as Parameters<typeof conversion>[1];
    if (value === undefined) return EMPTY_VALUE;
    return conversion(value) as ReturnType<ConversionMap[T]>;
}
