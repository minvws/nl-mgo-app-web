import { type Nullable } from '@minvws/mgo-mgo-utils';
import { type ContactPoint } from 'fhir/r4';
import { parse } from '../../../parse';
import { type ResourceElementConfig } from '../../../types';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface R4NlCoreContactInformationEmailAddresses {
    system: 'email';
    value: parse.MgoString | undefined; // NL-CM:20.6.7
    use: parse.MgoCode | undefined; // NL-CM:20.6.8
}

/**
 * @name HCIM NlCoreContactInformationEmailAddresses
 * @usage Patient.telecom
 * @see https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946081
 */
function parseNlCoreContactInformationEmailAddresses(
    value: Nullable<ContactPoint>
): R4NlCoreContactInformationEmailAddresses | undefined {
    if (value?.system !== 'email') return;

    return {
        system: value.system,
        value: parse.string(value?.value),
        use: parse.code(value?.use),
    };
}

export const nlCoreContactInformationEmailAddresses = {
    parse: parseNlCoreContactInformationEmailAddresses,
    uiSchemaGroup,
} satisfies ResourceElementConfig<ContactPoint, R4NlCoreContactInformationEmailAddresses>;
