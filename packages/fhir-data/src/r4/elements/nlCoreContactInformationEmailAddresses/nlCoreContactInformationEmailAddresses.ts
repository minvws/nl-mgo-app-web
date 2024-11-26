import { type Nullable } from '../../../types/Nullable';
import { uiSchemaGroup } from './uiSchemaGroup';
import { parse } from '../../../parse';
import { type R4ResourceElementConfig } from '../config';
import { type ContactPoint } from 'fhir/r4';

export interface NlCoreContactInformationEmailAddresses {
    system: 'email';
    value: parse.MgoString | undefined; // NL-CM:20.6.7
    use: parse.MgoString | undefined; // NL-CM:20.6.8
}

/**
 * @name HCIM NlCoreContactInformationEmailAddresses
 * @usage Patient.telecom
 * @see https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946081
 */
function parseNlCoreContactInformationEmailAddresses(
    value: Nullable<ContactPoint>
): NlCoreContactInformationEmailAddresses | undefined {
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
} satisfies R4ResourceElementConfig<ContactPoint, NlCoreContactInformationEmailAddresses>;
