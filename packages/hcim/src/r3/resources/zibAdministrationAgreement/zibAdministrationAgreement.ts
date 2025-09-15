import { FhirVersion } from '@minvws/mgo-fhir';
import { type MedicationDispense } from '@minvws/mgo-fhir/r3';
import { parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { type ResourceConfig } from '../../../resourceTypes.js';
import { zibInstructionsForUse } from '../../elements/index.js';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-AdministrationAgreement'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317124
 */
function parseZibAdministrationAgreement(resource: MedicationDispense) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        patient: parse.reference(resource.subject),
        performer: map(resource.performer, (performer) => ({
            actor: parse.reference(performer?.actor),
            onBehalfOf: parse.reference(performer?.onBehalfOf),
        })),

        // HCIM AdministrationAgreement-v1.0.1(2017EN)
        authoredOn: parse.extension(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/zib-AdministrationAgreement-AuthoredOn', // NOSONAR
            'dateTime'
        ),
        agreementReason: parse.extension(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/zib-AdministrationAgreement-AgreementReason', // NOSONAR
            'string'
        ),
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
        status: parse.code(resource.status),
        medicationReference: parse.reference(resource.medicationReference),
        authorizingPrescription: map(resource.authorizingPrescription, parse.reference),
        note: map(resource.note, parse.annotation),

        // HCIM InstructionsForUse-v1.1(2017EN)
        dossageInstruction: map(resource.dosageInstruction, zibInstructionsForUse.parse),
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

export type ZibAdministrationAgreement = ReturnType<typeof parseZibAdministrationAgreement>;

export const zibAdministrationAgreement = {
    profile,
    parse: parseZibAdministrationAgreement,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, MedicationDispense, ZibAdministrationAgreement>;
