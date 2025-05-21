import { type Coding, type CodingSystem } from '@minvws/mgo-fhir-types';
import { type Nullable } from '@minvws/mgo-mgo-utils';

export type CodingCodeFilter = {
    system: CodingSystem;
    code: string;
};

export type CodingSystemFilter = {
    system: CodingSystem;
    code?: never;
};

export function isSystemFilter(
    filter: CodingCodeFilter | CodingSystemFilter
): filter is CodingSystemFilter {
    return typeof filter['code'] === 'undefined';
}

export const matchesCodingFilter = (
    coding: Coding,
    filter:
        | Readonly<CodingCodeFilter>
        | Readonly<CodingSystemFilter>
        | ReadonlyArray<CodingCodeFilter | CodingSystemFilter>
) => {
    if (Array.isArray(filter)) {
        return filter.some(
            ({ system, code }) =>
                coding?.system === system &&
                (typeof code === 'string' ? coding?.code === code : true)
        );
    }
    const { system, code } = filter as CodingCodeFilter;
    return coding?.system === system && (typeof code === 'string' ? coding?.code === code : true);
};

export function filterCoding(
    coding: Nullable<Coding>,
    filter:
        | Readonly<CodingCodeFilter>
        | Readonly<CodingSystemFilter>
        | ReadonlyArray<CodingCodeFilter | CodingSystemFilter>
): Coding | undefined;
export function filterCoding(
    coding: Nullable<Coding[]>,
    filter: Readonly<CodingCodeFilter>
): Coding | undefined;
export function filterCoding(
    coding: Nullable<Coding[]>,
    filter: ReadonlyArray<CodingCodeFilter | CodingSystemFilter> | CodingSystemFilter
): Coding[] | undefined;
export function filterCoding(
    coding: Nullable<Coding[]> | Nullable<Coding>,
    filter:
        | Readonly<CodingCodeFilter>
        | Readonly<CodingSystemFilter>
        | ReadonlyArray<CodingCodeFilter | CodingSystemFilter>
): Coding | Coding[] | undefined {
    if (!coding) {
        return undefined;
    }

    if (Array.isArray(coding)) {
        if (
            Array.isArray(filter) ||
            isSystemFilter(filter as CodingCodeFilter | CodingSystemFilter)
        ) {
            return coding.filter((x) => matchesCodingFilter(x, filter));
        }
        return coding.find((x) => matchesCodingFilter(x, filter));
    }

    if (matchesCodingFilter(coding, filter)) {
        return coding;
    }
}
