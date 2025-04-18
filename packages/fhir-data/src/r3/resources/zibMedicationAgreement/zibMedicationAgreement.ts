import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type MedicationRequest } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';
import { zibInstructionsForUse } from '../../elements/zibInstructionsForUse/zibInstructionsForUse';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-MedicationAgreement'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317273
 */
function parseZibMedicationAgreement(resource: MedicationRequest) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        patient: parse.reference(resource.subject),

        // HCIM MedicationAgreement-v1.0(2017EN)
        periodOfUse: parse.extension(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/zib-Medication-PeriodOfUse', // NOSONAR
            'period'
        ),
        usageDuration: parse.extension(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/zib-MedicationUse-Duration', // NOSONAR
            'duration'
        ),
        additionalInformation: parse.extension(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/zib-Medication-AdditionalInformation', // NOSONAR
            'codeableConcept'
        ),
        stopType: parse.extension(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/zib-Medication-StopType', // NOSONAR
            'codeableConcept'
        ),
        medicationReference: parse.reference(resource.medicationReference),
        authoredOn: parse.dateTime(resource.authoredOn),
        requester: parse.reference(resource.requester),
        reasonCode: map(resource.reasonCode, parse.codeableConcept),
        reasonReference: map(resource.reasonReference, parse.reference),
        note: map(resource.note, parse.annotation),
        dossageInstruction: map(resource.dosageInstruction, zibInstructionsForUse.parse),

        // HCIM InstructionsForUse-v1.1(2017EN)
        repeatPeriodCyclicalSchedule: parse.extension(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/zib-Medication-RepeatPeriodCyclicalSchedule', // NOSONAR
            'duration'
        ),

        // Medication Process v09
        medicationTreatment: parse.extension(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/zib-Medication-MedicationTreatment', // NOSONAR
            'identifier'
        ),
    };
}

export type ZibMedicationAgreement = ReturnType<typeof parseZibMedicationAgreement>;

export const zibMedicationAgreement = {
    profile,
    parse: parseZibMedicationAgreement,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<MedicationRequest, ZibMedicationAgreement>;
