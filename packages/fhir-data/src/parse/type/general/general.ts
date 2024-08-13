import {
    type Annotation,
    type CodeableConcept,
    type Coding,
    type Duration,
    type Identifier,
    type Period,
    type Quantity,
    type Range,
    type Ratio,
} from '../../../fhir';
import { map } from '../../../utils';
import { deepReplaceUndefined } from '../../helpers';
import { addNullishReturn } from '../../helpers/addNullishReturn/addNullishReturn';
import { dateTime } from '../primitive/primitive';
import { reference } from '../special/special';

export const annotation = addNullishReturn((value: Annotation) => {
    const { time, text, authorReference } = value;
    return deepReplaceUndefined({
        time: dateTime(time),
        text,
        author: reference(authorReference),
    });
});

export const codeableConcept = addNullishReturn((value: CodeableConcept) => {
    if (!value.coding?.length) return null;
    return map(value.coding, coding);
});

export const coding = addNullishReturn((value: Coding) => {
    const { code, display, system } = value;
    return deepReplaceUndefined({
        code,
        display,
        system,
    });
});

export const identifier = addNullishReturn((identifierValue: Identifier) => {
    const { use, system, value, type } = identifierValue;
    return deepReplaceUndefined({
        use,
        system,
        value,
        type: codeableConcept(type),
    });
});

export const period = addNullishReturn((value: Period) => {
    const { start, end } = value;
    return { start: dateTime(start), end: dateTime(end) };
});

function quantityLike<T extends Quantity>(value: T) {
    const { value: valueQuantity, comparator, unit, system, code } = value;
    return deepReplaceUndefined({ value: valueQuantity, comparator, unit, system, code });
}
export const quantity = addNullishReturn(quantityLike<Quantity>);
export const duration = addNullishReturn(quantityLike<Duration>);

export const ratio = addNullishReturn((value: Ratio) => {
    const { numerator, denominator } = value;
    return { numerator: quantity(numerator), denominator: quantity(denominator) };
});

export const range = addNullishReturn((value: Range) => {
    return {
        low: quantity(value.low),
        high: quantity(value.high),
    };
});
