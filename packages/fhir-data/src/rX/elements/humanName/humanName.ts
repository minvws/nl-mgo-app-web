import { parse } from '../../../parse';
import { type HumanName } from '../../../types/FhirRX';
import { type Nullable } from '../../../types/Nullable';
import { map } from '../../../utils';
import { type RxResourceElementConfig } from '../config';
import { uiSchemaGroup } from './uiSchemaGroup';

export type MgoHumanname = {
    family: parse.MgoString | undefined;
    given: parse.MgoString[] | undefined;
    period: parse.MgoPeriod | undefined;
    prefix: parse.MgoString[] | undefined;
    suffix: parse.MgoString[] | undefined;
    text: parse.MgoString | undefined;
    use: parse.MgoString | undefined;
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317028
 */
function parseHumanName(value: Nullable<HumanName>): MgoHumanname {
    return {
        family: parse.string(value?.family),
        given: map(value?.given, parse.string),
        period: parse.period(value?.period),
        prefix: map(value?.prefix, parse.string),
        suffix: map(value?.suffix, parse.string),
        text: parse.string(value?.text),
        use: parse.string(value?.use),
    };
}

export const humanName = {
    parse: parseHumanName,
    uiSchemaGroup,
} satisfies RxResourceElementConfig<HumanName, MgoHumanname>;
