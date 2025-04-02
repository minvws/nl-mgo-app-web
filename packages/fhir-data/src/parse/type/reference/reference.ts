import { type Reference } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type ValueType } from '../../types';

export interface MgoReferenceProps {
    reference: string | undefined;
    display: string | undefined;
}

export interface MgoReference extends MgoReferenceProps, ValueType<'reference'> {}

export function referenceProps<T extends Reference>(value: T): MgoReferenceProps {
    const { reference, display } = value;
    return {
        reference,
        display,
    };
}

export const reference = createTypeParser<Reference, MgoReference>((value) => {
    return {
        _type: 'reference',
        ...referenceProps(value),
    };
});
