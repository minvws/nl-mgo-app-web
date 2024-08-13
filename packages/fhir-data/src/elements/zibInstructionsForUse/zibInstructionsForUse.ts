import { type Dosage } from '../../fhir';
import { parse, type MgoParsedType } from '../../parse/type';
import { type Nullable } from '../../types/Nullable';
import { map } from '../../utils';
import { zibAdministrationSchedule } from '../zibAdministrationSchedule/zibAdministrationSchedule';

/**
 * @name HCIM InstructionsForUse
 * @usage zibMedicationUse.dosage
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317236
 */
export function zibInstructionsForUse(value: Nullable<Dosage>) {
    return {
        additionalInstruction: map(value?.additionalInstruction, parse.codeableConcept),
        asNeeded: parse.codeableConcept(value?.asNeededCodeableConcept),
        doseQuantity: parse.quantity(value?.doseQuantity),
        doseRange: parse.range(value?.doseRange),
        maxDosePerPeriod: parse.ratio(value?.maxDosePerPeriod),
        rateRatio: parse.ratio(value?.rateRatio),
        rateRange: parse.range(value?.rateRange),
        rateQuantity: parse.quantity(value?.rateQuantity),
        timing: zibAdministrationSchedule(value?.timing),
    };
}

export type ZibInstructionsForUse = MgoParsedType<typeof zibInstructionsForUse>;
