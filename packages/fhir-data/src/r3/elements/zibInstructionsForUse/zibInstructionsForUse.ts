import { type Dosage } from 'fhir/r3';
import { parse } from '../../../parse';
import { oneOfValueX } from '../../../parse/helpers/oneOfValueX/oneOfValueX';
import { type ResourceElementConfig } from '../../../types/Fhir';
import { type Nullable } from '../../../types/Nullable';
import { map } from '../../../utils';
import {
    zibAdministrationSchedule,
    type ZibAdministrationSchedule,
} from '../zibAdministrationSchedule/zibAdministrationSchedule';
import { summary } from './summary';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface ZibInstructionsForUse {
    sequence: parse.MgoInteger | undefined;
    text: parse.MgoString | undefined;
    additionalInstruction: parse.MgoCodeableConcept[] | undefined;
    asNeeded: parse.MgoCodeableConcept | undefined;
    route: parse.MgoCodeableConcept | undefined;
    doseQuantity?: parse.MgoQuantityLike;
    doseRange?: parse.MgoRange;
    maxDosePerPeriod: parse.MgoRatio | undefined;
    timing: ZibAdministrationSchedule;
    rateRatio?: parse.MgoRatio;
    rateRange?: parse.MgoRange;
    rateQuantity?: parse.MgoQuantityLike;
}

/**
 * @name HCIM InstructionsForUse
 * @usage zibMedicationUse.dosage
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317236
 */
function parseZibInstructionsForUse(value: Nullable<Dosage>): ZibInstructionsForUse {
    return {
        sequence: parse.integer(value?.sequence),
        text: parse.string(value?.text),
        additionalInstruction: map(value?.additionalInstruction, parse.codeableConcept),
        asNeeded: parse.codeableConcept(value?.asNeededCodeableConcept),
        route: parse.codeableConcept(value?.route),
        ...oneOfValueX(value, ['range', 'quantity'], 'dose'),
        maxDosePerPeriod: parse.ratio(value?.maxDosePerPeriod),
        ...oneOfValueX(value, ['ratio', 'range', 'quantity'], 'rate'),
        timing: zibAdministrationSchedule.parse(value?.timing),
    };
}

export const zibInstructionsForUse = {
    parse: parseZibInstructionsForUse,
    uiSchemaGroup,
    summary,
} satisfies ResourceElementConfig<Dosage, ZibInstructionsForUse>;
