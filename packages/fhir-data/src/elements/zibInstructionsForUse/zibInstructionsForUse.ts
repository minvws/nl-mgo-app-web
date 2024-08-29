import { type Dosage } from '../../fhir';
import * as parse from '../../parse/type';
import { type Nullable } from '../../types/Nullable';
import { map } from '../../utils';
import { type ResourceElementConfig } from '../config';
import {
    type ZibAdministrationSchedule,
    zibAdministrationSchedule,
} from '../zibAdministrationSchedule/zibAdministrationSchedule';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface ZibInstructionsForUse {
    additionalInstruction: parse.MgoCodeableConcept[] | undefined;
    asNeeded: parse.MgoCodeableConcept | undefined;
    doseQuantity: parse.MgoQuantity | undefined;
    doseRange: parse.MgoRange | undefined;
    maxDosePerPeriod: parse.MgoRatio | undefined;
    rateRatio: parse.MgoRatio | undefined;
    rateRange: parse.MgoRange | undefined;
    rateQuantity: parse.MgoQuantity | undefined;
    timing: ZibAdministrationSchedule;
}

/**
 * @name HCIM InstructionsForUse
 * @usage zibMedicationUse.dosage
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317236
 */
function parseZibInstructionsForUse(value: Nullable<Dosage>): ZibInstructionsForUse {
    return {
        additionalInstruction: map(value?.additionalInstruction, parse.codeableConcept),
        asNeeded: parse.codeableConcept(value?.asNeededCodeableConcept),
        doseQuantity: parse.quantity(value?.doseQuantity),
        doseRange: parse.range(value?.doseRange),
        maxDosePerPeriod: parse.ratio(value?.maxDosePerPeriod),
        rateRatio: parse.ratio(value?.rateRatio),
        rateRange: parse.range(value?.rateRange),
        rateQuantity: parse.quantity(value?.rateQuantity),
        timing: zibAdministrationSchedule.parse(value?.timing),
    };
}

export const zibInstructionsForUse = {
    parse: parseZibInstructionsForUse,
    uiSchemaGroup,
} satisfies ResourceElementConfig<Dosage, ZibInstructionsForUse>;
