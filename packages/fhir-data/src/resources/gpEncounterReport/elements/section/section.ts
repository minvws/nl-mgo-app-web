import { type CompositionSection } from '../../../../fhir';
import { parse } from '../../../../parse';
import { type Nullable } from '../../../../types/Nullable';
import { map } from '../../../../utils';

export interface Section {
    code: parse.MgoCodeableConcept | undefined;
    entry: parse.MgoReference[] | undefined;
}

export function parseSection(value: Nullable<CompositionSection>): Section {
    return {
        code: parse.codeableConcept(value?.code),
        entry: map(value?.entry, parse.reference),
    };
}
