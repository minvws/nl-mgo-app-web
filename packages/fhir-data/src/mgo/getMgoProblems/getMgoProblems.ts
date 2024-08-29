import type { Bundle, FhirResource } from '../../fhir';
import { type Lossless } from '../../types/Lossless';
import { getBundleResources, safeGetBulk } from '../../utils';

export function getMgoProblems<T extends FhirResource>(bundle: Lossless<Bundle<T>>) {
    const conditions = getBundleResources(bundle, 'Condition');

    return conditions.map((condition) => {
        return {
            ...safeGetBulk(condition, {
                title: ({ code }) => code.coding[0].display,
                comment: ({ note }) => note.map((x) => x.text).join(', '),
                clinicalStatus: ({ clinicalStatus }) => clinicalStatus,
                category: ({ category }) =>
                    category
                        .map((x) => x.coding.map((y) => y.display))
                        .flat()
                        .join(', '),
                startDate: ({ onsetDateTime }) => onsetDateTime,
                endDate: ({ abatementDateTime }) => abatementDateTime ?? null,
                bodyLocation: ({ bodySite }) =>
                    `${bodySite[0].coding[0].display}, ${bodySite[0].extension[0].valueCodeableConcept.coding[0].display}`,
            }),
        };
    });
}

export type MgoProblem = ReturnType<typeof getMgoProblems>[number];
