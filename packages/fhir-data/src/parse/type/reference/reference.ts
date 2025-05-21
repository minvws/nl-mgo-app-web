import { type Reference } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type ValueType } from '../../types';

export interface MgoReference extends ValueType<'reference'> {
    reference: string | undefined;
    display: string | undefined;
}

export const reference = createTypeParser<Reference, MgoReference>((value) => {
    const { reference, display } = value;
    return {
        _type: 'reference',
        reference,
        display,
    };
});
