import { type Nullable } from '@minvws/mgo-mgo-utils';
import { type CompositionSection } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { map } from '../../../../../utils';

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
