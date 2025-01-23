import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type MedicationStatement } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types/Fhir';
import { map } from '../../../utils';
import { zibInstructionsForUse } from '../../elements';
import { summary } from './summary';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-MedicationUse'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317279
 */
function parseZibMedicationUse(resource: MedicationStatement) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        asAgreedIndicator: parse.extensionNictiz(resource, 'zib-MedicationUse-AsAgreedIndicator'),
        prescriber: parse.extensionNictiz(resource, 'zib-MedicationUse-Prescriber'),
        author: parse.extensionNictiz(resource, 'zib-MedicationUse-Author'),
        medicationTreatment: parse.extensionNictiz(resource, 'zib-Medication-MedicationTreatment'),
        reasonForChangeOrDiscontinuationOfUse: parse.extensionNictiz(
            resource,
            'zib-MedicationUse-ReasonForChangeOrDiscontinuationOfUse'
        ),
        repeatPeriodCyclicalSchedule: parse.extensionNictiz(
            resource,
            'zib-Medication-RepeatPeriodCyclicalSchedule'
        ),
        identifier: map(resource.identifier, parse.identifier),
        status: parse.code(resource.status),
        category: parse.codeableConcept(resource.category),
        medicationReference: parse.reference(resource.medicationReference),
        effectivePeriod: parse.period(resource.effectivePeriod),

        effectiveDuration: parse.extensionNictiz(
            resource.effectivePeriod,
            'zib-MedicationUse-Duration'
        ),
        dateAsserted: parse.dateTime(resource.dateAsserted),
        informationSource: parse.reference(resource.informationSource),
        subject: parse.reference(resource.subject),
        taken: parse.code(resource.taken),
        reasonCode: map(resource.reasonCode, parse.codeableConcept),
        note: map(resource.note, parse.annotation),
        dosage: map(resource.dosage, zibInstructionsForUse.parse),
    };
}

export type ZibMedicationUse = ReturnType<typeof parseZibMedicationUse>;

export const zibMedicationUse = {
    profile,
    parse: parseZibMedicationUse,
    summary,
    uiSchema,
} satisfies ResourceConfig<MedicationStatement, ZibMedicationUse>;
