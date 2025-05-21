import { type Identifier } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type ValueType } from '../../types';
import {
    codeableConceptProps,
    type MgoCodeableConceptProps,
} from '../codeableConcept/codeableConcept';

export interface MgoIdentifier extends ValueType<'identifier'> {
    use: string | undefined;
    system: string | undefined;
    value: string | undefined;
    type: MgoCodeableConceptProps | undefined;
}

export const identifier = createTypeParser<Identifier, MgoIdentifier>((value) => {
    const { use, system, value: identifierValue, type } = value;
    return {
        _type: 'identifier',
        use,
        system,
        value: identifierValue,
        type: type && codeableConceptProps(type),
    };
});
