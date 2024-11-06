import { type Coding, type CodeableConcept } from 'fhir/r3';
import { type Nullable } from '../../../types/Nullable';

export function filterCodeableConceptByCoding<Iteratee extends (arg: Coding) => unknown>(
    items: Nullable<CodeableConcept[]>,
    iteratee: Iteratee
): CodeableConcept[] | undefined {
    return items?.filter((item) => item.coding?.some(iteratee));
}
