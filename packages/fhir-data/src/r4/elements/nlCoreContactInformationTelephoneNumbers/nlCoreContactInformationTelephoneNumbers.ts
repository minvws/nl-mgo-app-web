import { type Nullable } from '@minvws/mgo-mgo-utils';
import { type ContactPoint } from 'fhir/r4';
import { parse } from '../../../parse';
import { type ResourceElementConfig } from '../../../types';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface R4NlCoreContactInformationTelephoneNumbers {
    system: 'phone';
    telecomType: parse.MgoCodeableConcept | undefined;
    value: parse.MgoString | undefined; // NL-CM:20.6.4
    use: parse.MgoCode | undefined; // NL-CM:20.6.6
    comment: parse.MgoString | undefined; // NL-CM:20.6.9
}

/**
 * @name HCIM NlCoreContactInformationTelephoneNumbers
 * @usage Patient.telecom
 * @see https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946082
 */
function parseNlCoreContactInformationTelephoneNumbers(
    value: Nullable<ContactPoint>
): R4NlCoreContactInformationTelephoneNumbers | undefined {
    if (value?.system !== 'phone') return;

    return {
        system: value.system,
        telecomType: parse.extension(
            value._system,
            'http://nictiz.nl/fhir/StructureDefinition/ext-CodeSpecification', // NOSONAR
            'codeableConcept'
        ),
        value: parse.string(value?.value),
        use: parse.code(value?.use),
        comment: parse.extension(
            value,
            'http://nictiz.nl/fhir/StructureDefinition/ext-Comment', // NOSONAR
            'string'
        ),
    };
}

export const nlCoreContactInformationTelephoneNumbers = {
    parse: parseNlCoreContactInformationTelephoneNumbers,
    uiSchemaGroup,
} satisfies ResourceElementConfig<ContactPoint, R4NlCoreContactInformationTelephoneNumbers>;
