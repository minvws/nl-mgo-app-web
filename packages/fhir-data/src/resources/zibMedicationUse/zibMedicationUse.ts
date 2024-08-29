import { zibInstructionsForUse } from '../../elements';
import { type MedicationStatement } from '../../fhir/index';
import { extensionNictiz } from '../../parse/helpers';
import { annotation } from '../../parse/type/annotation/annotation';
import { code } from '../../parse/type/code/code';
import { codeableConcept } from '../../parse/type/codeableConcept/codeableConcept';
import { dateTime } from '../../parse/type/dateTime/dateTime';
import { identifier } from '../../parse/type/identifier/identifier';
import { period } from '../../parse/type/period/period';
import { reference } from '../../parse/type/reference/reference';
import { map } from '../../utils';
import { parseResourceMeta } from '../resourceMeta/resourceMeta';
import { type ResourceConfig } from '../config';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-MedicationUse';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317279
 */
function parseZibMedicationUse(resource: MedicationStatement) {
    return {
        ...parseResourceMeta(resource, profile),
        asAgreedIndicator: extensionNictiz(resource, 'zib-MedicationUse-AsAgreedIndicator'),
        prescriber: extensionNictiz(resource, 'zib-MedicationUse-Prescriber'),
        author: extensionNictiz(resource, 'zib-MedicationUse-Author'),
        medicationTreatment: extensionNictiz(resource, 'zib-Medication-MedicationTreatment'),
        reasonForChangeOrDiscontinuationOfUse: extensionNictiz(
            resource,
            'zib-MedicationUse-ReasonForChangeOrDiscontinuationOfUse'
        ),
        repeatPeriodCyclicalSchedule: extensionNictiz(
            resource,
            'zib-Medication-RepeatPeriodCyclicalSchedule'
        ),
        identifier: map(resource.identifier, identifier),
        status: code(resource.status),
        category: codeableConcept(resource.category),
        medication: reference(resource.medicationReference),
        effectiveDuration: extensionNictiz(resource.effectivePeriod, 'zib-MedicationUse-Duration'),
        effectivePeriod: period(resource.effectivePeriod),
        dateAsserted: dateTime(resource.dateAsserted),
        informationSource: reference(resource.informationSource),
        subject: reference(resource.subject),
        taken: code(resource.taken),
        reasonCode: map(resource.reasonCode, codeableConcept),
        note: map(resource.note, annotation),
        dosage: map(resource.dosage, zibInstructionsForUse.parse),
    };
}

export type ZibMedicationUse = ReturnType<typeof parseZibMedicationUse>;

export const zibMedicationUse = {
    profile,
    parse: parseZibMedicationUse,
    uiSchema,
} satisfies ResourceConfig<MedicationStatement, ZibMedicationUse>;
