import { type Identifier } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type ValueType } from '../../types';
import { codeableConcept, type MgoCodeableConcept } from '../codeableConcept/codeableConcept';

export interface MgoIdentifier extends ValueType<'Identifier'> {
    use: string | undefined;
    system: string | undefined;
    value: string | undefined;
    type: MgoCodeableConcept | undefined;
}

export const identifier = createTypeParser<Identifier, MgoIdentifier>((value) => {
    const { use, system, value: identifierValue, type } = value;
    return {
        _type: 'Identifier',
        use,
        system,
        value: identifierValue,
        type: codeableConcept(type),
    };
});
