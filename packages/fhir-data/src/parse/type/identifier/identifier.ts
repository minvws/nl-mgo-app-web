import { type Identifier } from '../../../fhir';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { codeableConcept, type MgoCodeableConcept } from '../codeableConcept/codeableConcept';

export interface MgoIdentifier {
    use: string | undefined;
    system: string | undefined;
    value: string | undefined;
    type: MgoCodeableConcept | undefined;
}

export const identifier = createTypeParser<Identifier, MgoIdentifier>((value) => {
    const { use, system, value: identifierValue, type } = value;
    return {
        use,
        system,
        value: identifierValue,
        type: codeableConcept(type),
    };
});
