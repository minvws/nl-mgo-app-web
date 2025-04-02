import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type MedicationStatement } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types/Fhir';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';
import { zibInstructionsForUse } from '../../elements';
import { summary } from './summary';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-MedicationUse'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317279
 */
function parseZibMedicationUse(resource: MedicationStatement) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        author: parse.extensionNictiz(resource, 'zib-MedicationUse-Author'),
        identifier: map(resource.identifier, parse.identifier),
        informationSource: parse.reference(resource.informationSource),
        subject: parse.reference(resource.subject),

        // HCIM MedicationUse2-v1.0.1(2017EN)
        asAgreedIndicator: parse.extensionNictiz(resource, 'zib-MedicationUse-AsAgreedIndicator'),
        prescriber: parse.extensionNictiz(resource, 'zib-MedicationUse-Prescriber'),
        reasonForChangeOrDiscontinuationOfUse: parse.extensionNictiz(
            resource,
            'zib-MedicationUse-ReasonForChangeOrDiscontinuationOfUse'
        ),
        status: parse.code(resource.status),
        medicationReference: parse.reference(resource.medicationReference),
        dateAsserted: parse.dateTime(resource.dateAsserted),
        taken: parse.code(resource.taken),
        reasonCode: map(resource.reasonCode, parse.codeableConcept),
        effectivePeriod: {
            _type: 'period' as const,
            start: undefined,
            end: undefined,
            ...parse.period(resource.effectivePeriod),
            duration: parse.extensionNictiz(resource.effectivePeriod, 'zib-MedicationUse-Duration'),
        },
        note: map(resource.note, parse.annotation),

        // HCIM InstructionsForUse-v1.1(2017EN)
        dosage: map(resource.dosage, zibInstructionsForUse.parse),
        repeatPeriodCyclicalSchedule: parse.extensionNictiz(
            resource,
            'zib-Medication-RepeatPeriodCyclicalSchedule'
        ),

        // Medication Process v09
        medicationTreatment: parse.extensionNictiz(resource, 'zib-Medication-MedicationTreatment'),
    };
}

export type ZibMedicationUse = ReturnType<typeof parseZibMedicationUse>;

export const zibMedicationUse = {
    profile,
    parse: parseZibMedicationUse,
    summary,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<MedicationStatement, ZibMedicationUse>;
