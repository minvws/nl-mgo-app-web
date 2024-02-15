import type { Patient } from '../../../fhir';
import { safeGetBulk } from '../../../utils';

export function getHumanName(fhir?: Patient) {
    const { given, family } = safeGetBulk(fhir, {
        given: (x) => x.name![0]!.given!.join(' '),
        family: (x) => x.name![0]!.family,
    });
    return `${given} ${family}`;
}
