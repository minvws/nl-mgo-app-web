import { type Quantity } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';

export interface MgoQuantity {
    value: number | undefined;
    comparator: string | undefined;
    unit: string | undefined;
    system: string | undefined;
    code: string | undefined;
}

export function quantityLike<T extends Quantity>(value: T) {
    const { value: valueQuantity, comparator, unit, system, code } = value;
    return { value: valueQuantity, comparator, unit, system, code };
}

export const quantity = createTypeParser<Quantity, MgoQuantity>(quantityLike);
