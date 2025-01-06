import { type ObservationReferenceRange } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type Nullable } from '../../../../../types/Nullable';
import { map } from '../../../../../utils';
import { type ResourceElementConfig } from '../../../../../types/Fhir';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface ReferenceRange {
    low: parse.MgoQuantity | undefined;
    high: parse.MgoQuantity | undefined;
    type: parse.MgoCodeableConcept | undefined;
    appliesTo: parse.MgoCodeableConcept[] | undefined;
    age: parse.MgoRange | undefined;
}

function parseReferenceRange(value: Nullable<ObservationReferenceRange>): ReferenceRange {
    return {
        low: parse.quantity(value?.low),
        high: parse.quantity(value?.high),
        type: parse.codeableConcept(value?.type),
        appliesTo: map(value?.appliesTo, parse.codeableConcept),
        age: parse.range(value?.age),
    };
}

export const referenceRange = {
    parse: parseReferenceRange,
    uiSchemaGroup,
} satisfies ResourceElementConfig<ObservationReferenceRange, ReferenceRange>;
