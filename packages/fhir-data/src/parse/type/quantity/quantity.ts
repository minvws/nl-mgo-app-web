import { type Quantity } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type ValueType } from '../../types';

export interface MgoQuantityLike<T extends string = string> extends ValueType<T> {
    value: number | undefined;
    comparator: string | undefined;
    unit: string | undefined;
    system: string | undefined;
    code: string | undefined;
}

export interface MgoQuantity extends MgoQuantityLike<'Quantity'> {}

export function quantityLike<T extends Quantity, Type extends string = 'Quanity'>(
    value: T,
    type: Type
): MgoQuantityLike<Type> {
    const { value: valueQuantity, comparator, unit, system, code } = value;
    return { _type: type, value: valueQuantity, comparator, unit, system, code };
}

export const quantity = createTypeParser<Quantity, MgoQuantity>((value) =>
    quantityLike(value, 'Quantity')
);
