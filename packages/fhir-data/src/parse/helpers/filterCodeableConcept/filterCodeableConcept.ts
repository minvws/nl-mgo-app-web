import { type CodeableConcept, type Coding } from '@minvws/mgo-fhir-types';
import { type Nullable } from '@minvws/mgo-utils';
import {
    isSystemFilter,
    matchesCodingFilter,
    type CodingCodeFilter,
    type CodingSystemFilter,
} from '../filterCoding/filterCoding';

const hasMatchingCoding = (
    codeableConcept: CodeableConcept,
    filter: // eslint-disable-next-line sonarjs/use-type-alias
    | Readonly<CodingCodeFilter>
        | Readonly<CodingSystemFilter>
        | ReadonlyArray<CodingCodeFilter | CodingSystemFilter>
): boolean => {
    const codings = (codeableConcept?.coding ?? []) as Coding[];
    return codings.some((coding) => matchesCodingFilter(coding, filter));
};

export function filterCodeableConcept(
    codeableConcept: Nullable<CodeableConcept>,
    codingFilter:
        | Readonly<CodingCodeFilter>
        | Readonly<CodingSystemFilter>
        | ReadonlyArray<CodingCodeFilter | CodingSystemFilter>
): CodeableConcept | undefined;
export function filterCodeableConcept(
    codeableConcept: Nullable<CodeableConcept[]>,
    codingFilter: Readonly<CodingCodeFilter>
): CodeableConcept | undefined;
export function filterCodeableConcept(
    codeableConcept: Nullable<CodeableConcept[]>,
    codingFilter:
        | Readonly<CodingSystemFilter>
        | ReadonlyArray<CodingCodeFilter | CodingSystemFilter>
): CodeableConcept[] | undefined;
export function filterCodeableConcept(
    codeableConcept: Nullable<CodeableConcept[]> | Nullable<CodeableConcept>,
    filter:
        | Readonly<CodingCodeFilter>
        | Readonly<CodingSystemFilter>
        | ReadonlyArray<CodingCodeFilter | CodingSystemFilter>
): CodeableConcept | CodeableConcept[] | undefined {
    if (!codeableConcept) {
        return undefined;
    }

    if (Array.isArray(codeableConcept)) {
        if (
            Array.isArray(filter) ||
            isSystemFilter(filter as CodingCodeFilter | CodingSystemFilter)
        ) {
            return codeableConcept.filter((concept) => hasMatchingCoding(concept, filter));
        }

        return codeableConcept.find((concept) => hasMatchingCoding(concept, filter));
    }

    if (hasMatchingCoding(codeableConcept, filter)) {
        return codeableConcept;
    }

    return undefined;
}
