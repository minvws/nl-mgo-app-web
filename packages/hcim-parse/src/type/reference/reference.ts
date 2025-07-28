import { type Reference } from '@minvws/mgo-fhir';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser.js';
import { type ValueType } from '../../types.js';

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
