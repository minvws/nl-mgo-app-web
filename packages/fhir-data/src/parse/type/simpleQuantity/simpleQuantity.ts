import { type Quantity } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type ValueType } from '../../types';

export interface MgoSimpleQuantityProps {
    value: number | undefined;
    unit: string | undefined;
    system: string | undefined;
    code: string | undefined;
}

export interface MgoSimpleQuantity extends MgoSimpleQuantityProps, ValueType<'simpleQuantity'> {}

export function simpleQuantityProps<T extends Quantity>(value: T): MgoSimpleQuantityProps {
    const { value: valueQuantity, unit, system, code } = value;
    return { value: valueQuantity, unit, system, code };
}

export const simpleQuantity = createTypeParser<Quantity, MgoSimpleQuantity>((value) => ({
    _type: 'simpleQuantity',
    ...simpleQuantityProps(value),
}));
