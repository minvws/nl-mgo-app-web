import { type ContactPoint } from 'fhir/r3';
import { parse } from '../../../parse';
import { type Nullable } from '../../../types/Nullable';
import { type ResourceElementConfig } from '../../../types/Fhir';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface NlCoreContactpoint {
    system: parse.MgoCode | undefined;
    value: parse.MgoString | undefined;
    use: parse.MgoCode | undefined;
    rank: parse.MgoPositiveInt | undefined;
    period: parse.MgoPeriod | undefined;
}

/**
 * @name HCIM NlCoreContactpoint
 * @usage Patient.telecom
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317022
 */
function parseNlCoreContactpoint(value: Nullable<ContactPoint>): NlCoreContactpoint {
    return {
        system: parse.code(value?.system),
        value: parse.string(value?.value),
        use: parse.code(value?.use),
        rank: parse.positiveInt(value?.rank),
        period: parse.period(value?.period),
    };
}

export const nlCoreContactpoint = {
    parse: parseNlCoreContactpoint,
    uiSchemaGroup,
} satisfies ResourceElementConfig<ContactPoint, NlCoreContactpoint>;
