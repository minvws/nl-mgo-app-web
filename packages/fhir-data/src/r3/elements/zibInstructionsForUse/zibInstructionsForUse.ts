import { type Dosage } from 'fhir/r3';
import { parse } from '../../../parse';
import { oneOfValueX } from '../../../parse/helpers/oneOfValueX/oneOfValueX';
import { type Nullable } from '../../../types/Nullable';
import { map } from '../../../utils';
import { type ResourceElementConfig } from '../../../types/Fhir';
import {
    zibAdministrationSchedule,
    type ZibAdministrationSchedule,
} from '../zibAdministrationSchedule/zibAdministrationSchedule';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface ZibInstructionsForUse {
    sequence: parse.MgoInteger | undefined;
    text: parse.MgoString | undefined;
    additionalInstruction: parse.MgoCodeableConcept[] | undefined;
    asNeeded: parse.MgoCodeableConcept | undefined;
    route: parse.MgoCodeableConcept | undefined;
    doseQuantity?: parse.MgoQuantity;
    doseRange?: parse.MgoRange;
    maxDosePerPeriod: parse.MgoRatio | undefined;
    timing: ZibAdministrationSchedule;
    rateRatio?: parse.MgoRatio;
    rateRange?: parse.MgoRange;
    rateQuantity?: parse.MgoQuantity;
}

/**
 * @name HCIM InstructionsForUse
 * @usage zibMedicationUse.dosage
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317236
 */
function parseZibInstructionsForUse(value: Nullable<Dosage>): ZibInstructionsForUse {
    return {
        sequence: parse.integer(value?.sequence), // NL-CM:9.12.22503
        text: parse.string(value?.text), // NL-CM:9.12.9581
        additionalInstruction: map(value?.additionalInstruction, parse.codeableConcept), // NL-CM:9.12.19944
        asNeeded: parse.codeableConcept(value?.asNeededCodeableConcept), // NL-CM:9.12.22512 | NL-CM:9.12.19945
        route: parse.codeableConcept(value?.route), // NL-CM:9.12.19941
        ...oneOfValueX(value, ['range', 'quantity'], 'dose'), // NL-CM:9.12.19940
        maxDosePerPeriod: parse.ratio(value?.maxDosePerPeriod), // NL-CM:9.12.19946
        ...oneOfValueX(value, ['ratio', 'range', 'quantity'], 'rate'), // NL-CM:9.12.19942
        timing: zibAdministrationSchedule.parse(value?.timing),
    };
}

export const zibInstructionsForUse = {
    parse: parseZibInstructionsForUse,
    uiSchemaGroup,
} satisfies ResourceElementConfig<Dosage, ZibInstructionsForUse>;
