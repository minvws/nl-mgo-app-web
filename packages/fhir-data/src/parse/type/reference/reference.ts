import { type Reference } from '../../../fhir';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';

export interface MgoReference {
    reference: string | undefined;
    display: string | undefined;
}

export const reference = createTypeParser<Reference, MgoReference>((value) => {
    const { reference, display } = value;
    return {
        reference,
        display,
    };
});
