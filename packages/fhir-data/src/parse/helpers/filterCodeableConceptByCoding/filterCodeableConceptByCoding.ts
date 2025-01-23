import { type CodeableConcept, type Coding } from '@minvws/mgo-fhir-types';
import { type Nullable } from '../../../types/Nullable';

export function filterCodeableConceptByCoding<Iteratee extends (arg: Coding) => unknown>(
    items: Nullable<CodeableConcept[]>,
    iteratee: Iteratee
): CodeableConcept[] | undefined {
    return items?.filter((item) => item.coding?.some(iteratee));
}
