import { type Quantity } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type ValueType } from '../../types';

export interface MgoQuantityProps {
    value: number | undefined;
    comparator: string | undefined;
    unit: string | undefined;
    system: string | undefined;
    code: string | undefined;
}

export interface MgoQuantity extends MgoQuantityProps, ValueType<'quantity'> {}

export function quantityProps<T extends Quantity>(value: T): MgoQuantityProps {
    const { value: valueQuantity, comparator, unit, system, code } = value;
    return { value: valueQuantity, comparator, unit, system, code };
}

export const quantity = createTypeParser<Quantity, MgoQuantity>((value) => ({
    _type: 'quantity',
    ...quantityProps(value),
}));
