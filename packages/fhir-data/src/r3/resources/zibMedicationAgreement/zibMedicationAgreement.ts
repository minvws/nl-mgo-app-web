import { zibInstructionsForUse } from '../../elements';
import { type MedicationRequest } from 'fhir/r3';
import { type I18nContext } from '../../../i18n';
import { FhirVersion } from '../../../types/Fhir';
import { parse } from '../../../parse';
import { map } from '../../../utils';
import { type ResourceConfigR3 } from '../config';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-MedicationAgreement'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317273
 */
function parseZibMedicationAgreement(resource: MedicationRequest, _i18nContext: I18nContext) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        periodOfUse: parse.extensionNictiz(resource, 'zib-Medication-PeriodOfUse'),
        usageDuration: parse.extensionNictiz(resource, 'zib-MedicationUse-Duration'),
        medicationTreatment: parse.extensionNictiz(resource, 'zib-Medication-MedicationTreatment'),
        stopType: parse.extensionNictiz(resource, 'zib-Medication-StopType'),
        repeatPeriodCyclicalSchedule: parse.extensionNictiz(
            resource,
            'zib-Medication-RepeatPeriodCyclicalSchedule'
        ),

        identifier: map(resource.identifier, parse.identifier),
        definition: map(resource.definition, parse.reference),
        basedOn: map(resource.basedOn, parse.reference),
        groupIdentifier: parse.identifier(resource.groupIdentifier),
        status: parse.code(resource.status),
        intent: parse.code(resource.intent),
        category: parse.codeableConcept(resource.category),
        priority: parse.code(resource.priority),
        medicationReference: parse.reference(resource.medicationReference),
        note: map(resource.note, parse.annotation),
        dossageInstruction: map(resource.dosageInstruction, zibInstructionsForUse.parse),
    };
}

export type ZibMedicationAgreement = ReturnType<typeof parseZibMedicationAgreement>;

export const zibMedicationAgreement = {
    profile,
    parse: parseZibMedicationAgreement,
    uiSchema,
} satisfies ResourceConfigR3<MedicationRequest, ZibMedicationAgreement>;
