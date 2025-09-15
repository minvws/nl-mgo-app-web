import { type Quantity } from '@minvws/mgo-fhir';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser.js';
import { type ValueType } from '../../types.js';

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
