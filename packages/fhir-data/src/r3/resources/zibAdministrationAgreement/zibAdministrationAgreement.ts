import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type MedicationDispense } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types/Fhir';
import { map } from '../../../utils';
import { zibInstructionsForUse } from '../../elements';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-AdministrationAgreement'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317124
 */
function parseZibAdministrationAgreement(resource: MedicationDispense) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        authoredOn: parse.extensionNictiz(resource, 'zib-AdministrationAgreement-AuthoredOn'),
        agreementReason: parse.extensionNictiz(
            resource,
            'zib-AdministrationAgreement-AgreementReason'
        ),
        usageDuration: parse.extensionNictiz(resource, 'zib-MedicationUse-Duration'),
        additionalInformation: parse.extensionNictiz(
            resource,
            'zib-Medication-AdditionalInformation'
        ),
        medicationTreatment: parse.extensionNictiz(resource, 'zib-Medication-MedicationTreatment'),
        stopType: parse.extensionNictiz(resource, 'zib-Medication-StopType'),
        repeatPeriodCyclicalSchedule: parse.extensionNictiz(
            resource,
            'zib-Medication-RepeatPeriodCyclicalSchedule'
        ),
        identifier: map(resource.identifier, parse.identifier),
        status: parse.code(resource.status),
        category: parse.codeableConcept(resource.category),
        medicationReference: parse.reference(resource.medicationReference),
        quantity: parse.quantity(resource.quantity),
        daysSupply: parse.quantity(resource.daysSupply),
        note: map(resource.note, parse.annotation),
        dossageInstruction: map(resource.dosageInstruction, zibInstructionsForUse.parse),
    };
}

export type ZibAdministrationAgreement = ReturnType<typeof parseZibAdministrationAgreement>;

export const zibAdministrationAgreement = {
    profile,
    parse: parseZibAdministrationAgreement,
    uiSchema,
} satisfies ResourceConfig<MedicationDispense, ZibAdministrationAgreement>;
