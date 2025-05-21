import { type Nullable } from '@minvws/mgo-mgo-utils';
import { type Dosage } from 'fhir/r3';
import { parse } from '../../../parse';
import { oneOfValueX } from '../../../parse/helpers/oneOfValueX/oneOfValueX';
import { type MgoElementMeta, type ResourceElementConfig } from '../../../types';
import { map } from '../../../utils';
import {
    zibAdministrationSchedule,
    type ZibAdministrationSchedule,
} from '../zibAdministrationSchedule/zibAdministrationSchedule';
import { summary } from './summary';
import { uiSchemaGroup } from './uiSchemaGroup';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-InstructionsForUse'; // NOSONAR

export type ZibInstructionsForUse = MgoElementMeta<typeof profile> & {
    sequence: parse.MgoInteger | undefined;
    text: parse.MgoString | undefined;
    additionalInstruction: parse.MgoCodeableConcept[] | undefined;
    asNeededCodeableConcept: parse.MgoCodeableConcept | undefined;
    route: parse.MgoCodeableConcept | undefined;
    doseQuantity?: parse.MgoQuantityProps;
    doseRange?: parse.MgoRange;
    maxDosePerPeriod: parse.MgoRatio | undefined;
    timing: ZibAdministrationSchedule;
    rateRatio?: parse.MgoRatio;
    rateRange?: parse.MgoRange;
    rateQuantity?: parse.MgoQuantityProps;
};

/**
 * @name HCIM InstructionsForUse
 * @usage zibMedicationUse.dosage
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317236
 */
export function parseZibInstructionsForUse(value: Nullable<Dosage>): ZibInstructionsForUse {
    return {
        _profile: profile,

        // HCIM InstructionsForUse-v1.1(2017EN)
        sequence: parse.integer(value?.sequence),
        text: parse.string(value?.text),
        additionalInstruction: map(value?.additionalInstruction, parse.codeableConcept),
        timing: zibAdministrationSchedule.parse(value?.timing),
        asNeededCodeableConcept: parse.codeableConcept(value?.asNeededCodeableConcept),
        route: parse.codeableConcept(value?.route),
        ...oneOfValueX(value, ['range', 'quantity'], 'dose'),
        maxDosePerPeriod: parse.ratio(value?.maxDosePerPeriod),
        ...oneOfValueX(value, ['ratio', 'range', 'quantity'], 'rate'),
    };
}

export const zibInstructionsForUse = {
    parse: parseZibInstructionsForUse,
    uiSchemaGroup,
    summary,
} satisfies ResourceElementConfig<Dosage, ZibInstructionsForUse>;
