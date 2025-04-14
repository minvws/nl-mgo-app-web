import { type CodeableConcept } from '@minvws/mgo-fhir-types';
import { type Nullable } from '@minvws/mgo-mgo-utils';
import { intersectionWith } from 'lodash';

interface CodeableConceptIntersectItem {
    system?: string;
    code?: string;
}

export function intersectCodeableConcept(
    items: Nullable<CodeableConcept[]>,
    intersectItems: CodeableConceptIntersectItem[]
) {
    return items?.filter((x) => {
        const codings = (x.coding ?? []) as CodeableConceptIntersectItem[];

        const matchingCodes = intersectionWith(codings, intersectItems, (item1, item2) => {
            return item1?.code === item2.code && item1.system === item2.system;
        });

        return matchingCodes.length;
    });
}
