import { type CodeableConcept, type Coding } from '@minvws/mgo-fhir-types';
import { type Nullable } from '@minvws/mgo-mgo-utils';

export function filterCodeableConceptByCoding<Iteratee extends (arg: Coding) => unknown>(
    items: Nullable<CodeableConcept[]>,
    iteratee: Iteratee
): CodeableConcept[] | undefined {
    return items?.filter((item) => item.coding?.some(iteratee));
}
