import { type LosslessJson } from '@minvws/mgo-fhir-client';
import type { MedicationStatement } from '../../../fhir';
import { safeGet } from '../../../utils';

/**
 * @see definition: https://hl7.org/fhir/stu3/medicationstatement.html
 */
export function getMedicationName(fhir?: LosslessJson<MedicationStatement> | MedicationStatement) {
    return safeGet(fhir, ({ medicationReference }) => medicationReference?.display);
}
