import { type HumanName } from 'fhir/r3';
import { parse } from '../../../parse';
import { type Nullable } from '../../../types/Nullable';
import { map } from '../../../utils';
import { type ResourceElementConfig } from '../../../types/Fhir';
import { uiSchemaGroup } from './uiSchemaGroup';

export type NlCoreHumanname = {
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
function parseNlCoreHumanname(value: Nullable<HumanName>): NlCoreHumanname {
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

export const nlCoreHumanname = {
    parse: parseNlCoreHumanname,
    uiSchemaGroup,
} satisfies ResourceElementConfig<HumanName, NlCoreHumanname>;
