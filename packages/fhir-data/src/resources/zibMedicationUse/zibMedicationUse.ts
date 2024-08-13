import { zibInstructionsForUse } from '../../elements';
import { type MedicationStatement } from '../../fhir';
import { extensionNictiz } from '../../parse/helpers';
import { parse, type MgoParsedType } from '../../parse/type';
import { map } from '../../utils';
import { parseResourceMeta } from '../resourceMeta/resourceMeta';
import { uiSchema } from './uiSchema';

/**∏
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317279
 */
export function parseZibMedicationUse(resource: MedicationStatement) {
    return {
        ...parseResourceMeta(resource),
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
        identifier: map(resource.identifier, parse.identifier),
        status: parse.code(resource.status),
        category: parse.codeableConcept(resource.category),
        medication: parse.reference(resource.medicationReference),
        effectiveDuration: extensionNictiz(resource.effectivePeriod, 'zib-MedicationUse-Duration'),
        effectivePeriod: parse.period(resource.effectivePeriod),
        dateAsserted: parse.dateTime(resource.dateAsserted),
        informationSource: parse.reference(resource.informationSource),
        subject: parse.reference(resource.subject),
        taken: parse.code(resource.taken),
        reasonCode: map(resource.reasonCode, parse.codeableConcept),
        note: map(resource.note, parse.annotation),
        dosage: map(resource.dosage, zibInstructionsForUse),
    };
}

export type ZibMedicationUse = MgoParsedType<typeof parseZibMedicationUse>;

export const zibMedicationUseUiSchema = uiSchema;
