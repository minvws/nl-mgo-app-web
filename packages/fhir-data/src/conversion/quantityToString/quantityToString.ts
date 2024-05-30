import { type LosslessNumber } from '@minvws/mgo-fhir-client';
import { type Quantity, type InputFhir } from '../../fhir';

function numberToString(value: number | LosslessNumber | undefined) {
    if (value === undefined) return '-';
    return value.toString();
}

export function quantityToString(quantity: InputFhir<Quantity> | undefined) {
    if (!quantity) return '';
    const { value, unit } = quantity;
    return numberToString(value) + (unit ? ` ${unit}` : '');
}
