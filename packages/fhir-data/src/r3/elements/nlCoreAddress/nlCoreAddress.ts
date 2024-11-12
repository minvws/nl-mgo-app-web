import { type Address } from 'fhir/r3';
import { type Nullable } from '../../../types/Nullable';
import { type ResourceElementConfigR3 } from '../config';
import { uiSchemaGroup } from './uiSchemaGroup';
import { map } from '../../../utils';
import { parse } from '../../../parse';

export interface NlCoreAddress {
    use: parse.MgoString | undefined;
    type: parse.MgoString | undefined;
    text: parse.MgoString | undefined;
    line: parse.MgoString[] | undefined;
    city: parse.MgoString | undefined;
    district: parse.MgoString | undefined;
    state: parse.MgoString | undefined;
    postalCode: parse.MgoString | undefined;
    country: parse.MgoString | undefined;
    period: parse.MgoPeriod | undefined;
}

/**
 * @name HCIM NlCoreAddress
 * @usage Patient.address
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317236
 */
function parseNlCoreAddress(value: Nullable<Address>): NlCoreAddress {
    return {
        use: parse.code(value?.use),
        type: parse.code(value?.type),
        text: parse.string(value?.text),
        line: map(value?.line, parse.string),
        city: parse.string(value?.city),
        district: parse.string(value?.district),
        state: parse.string(value?.state),
        postalCode: parse.string(value?.postalCode),
        country: parse.string(value?.country),
        period: parse.period(value?.period),
    };
}

export const nlCoreAddress = {
    parse: parseNlCoreAddress,
    uiSchemaGroup,
} satisfies ResourceElementConfigR3<Address, NlCoreAddress>;
