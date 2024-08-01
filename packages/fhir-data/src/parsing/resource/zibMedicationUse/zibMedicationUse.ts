import { type MedicationStatement } from '../../../fhir';
import { EMPTY_VALUE, parse } from '../../type';
import { extensionNictiz } from '../../element';
import { collection } from '../../helpers';
import { parseResourceMeta } from '../resourceMeta/resourceMeta';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317279
 */
export function parseZibMedicationUse(statement: MedicationStatement) {
    if (!statement) return EMPTY_VALUE;

    const {
        status,
        category,
        informationSource,
        subject,
        taken,
        reasonCode,
        effectivePeriod,
        medicationReference,
        identifier,
        note,
        dateAsserted,
    } = statement;

    return {
        ...parseResourceMeta(statement)!,
        asAgreedIndicator: extensionNictiz(statement, 'zib-MedicationUse-AsAgreedIndicator'),
        prescriber: extensionNictiz(statement, 'zib-MedicationUse-Prescriber'),
        author: extensionNictiz(statement, 'zib-MedicationUse-Author'),
        medicationTreatment: extensionNictiz(statement, 'zib-Medication-MedicationTreatment'),
        reasonForChangeOrDiscontinuationOfUse: extensionNictiz(
            statement,
            'zib-MedicationUse-ReasonForChangeOrDiscontinuationOfUse'
        ),
        repeatPeriodCyclicalSchedule: extensionNictiz(
            statement,
            'zib-Medication-RepeatPeriodCyclicalSchedule'
        ),
        identifier: collection(identifier, parse.identifier),
        status: parse.code(status),
        category: parse.codableConcept(category),
        medication: parse.reference(medicationReference),
        effectivePeriod: {
            ...extensionNictiz(effectivePeriod, 'zib-MedicationUse-Duration'),
            ...parse.period(effectivePeriod),
        },
        dateAsserted: parse.dateTime(dateAsserted),
        informationSource: parse.reference(informationSource),
        subject: parse.reference(subject),
        taken: parse.code(taken),
        reasonCode: collection(reasonCode, parse.codableConcept),
        note: collection(note, parse.annotation),
    };
}

export type ZibMedicationUse = ReturnType<typeof parseZibMedicationUse>;
