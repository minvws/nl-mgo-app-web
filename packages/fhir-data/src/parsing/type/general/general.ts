import {
    type Annotation,
    type CodeableConcept,
    type Coding,
    type Duration,
    type Identifier,
    type Period,
    type Quantity,
    type Ratio,
} from '../../../fhir';

import { EMPTY_VALUE } from '../emptyValue';
import { reference } from '../special/special';
import { dateTime } from '../primitive/primitive';
// Can not use the helpers/index to import as this will cause a circular dependency
import { setEmptyValues } from '../../helpers/emptyValues/emptyValues';

export function codableConcept({ coding: conceptCoding }: CodeableConcept = {}) {
    if (!conceptCoding?.length) return EMPTY_VALUE;
    return conceptCoding.map(coding);
}

export function coding(value?: Coding) {
    if (!value) return EMPTY_VALUE;
    const { code, display, system } = value;
    return setEmptyValues({
        code,
        display,
        system,
    });
}

export function identifier(identifierValue?: Identifier) {
    if (!identifierValue) return EMPTY_VALUE;
    const { use, system, value, type } = identifierValue;
    return setEmptyValues({
        use,
        system,
        value,
        type: codableConcept(type),
    });
}

export function period(value?: Period) {
    if (!value) return EMPTY_VALUE;
    const { start, end } = value;
    return { start: dateTime(start), end: dateTime(end) };
}

export function quantity<T extends Quantity>(value?: T) {
    if (!value) return EMPTY_VALUE;
    const { value: valueQuantity, comparator, unit, system, code } = value;
    return setEmptyValues({ value: valueQuantity, comparator, unit, system, code });
}

export const duration = quantity<Duration>;

export function ratio(value?: Ratio) {
    if (!value) return EMPTY_VALUE;
    const { numerator, denominator } = value;
    return { numerator: quantity(numerator), denominator: quantity(denominator) };
}

export function annotation(annotation?: Annotation) {
    if (!annotation) return EMPTY_VALUE;
    const { time, text, authorReference } = annotation;
    return setEmptyValues({
        time: dateTime(time),
        text,
        author: reference(authorReference),
    });
}
