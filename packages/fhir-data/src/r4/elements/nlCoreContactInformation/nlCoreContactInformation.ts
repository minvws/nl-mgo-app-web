import { type Nullable } from '@minvws/mgo-utils';
import { type ContactPoint } from 'fhir/r4';
import { parse } from '../../../parse';
import { type MgoCode, type MgoCodeableConcept, type MgoString } from '../../../parse/type';
import { type MgoElementMeta } from '../../../resourceTypes';

const profileTelephone =
    'http://nictiz.nl/fhir/StructureDefinition/zib-ContactInformationTelephoneNumbers'; // NOSONAR
const profileEmail =
    'http://nictiz.nl/fhir/StructureDefinition/zib-ContactInformationEmailAddresses'; // NOSONAR

export type R4NlCoreContactInformation = {
    telephoneNumbers: R4NlCoreContactInformationTelephoneNumbers[];
    emailAddresses: R4NlCoreContactInformationEmailAddresses[];
};

export type R4NlCoreContactInformationEmailAddresses = MgoElementMeta<typeof profileEmail> & {
    value: MgoString | undefined;
    use: MgoCode | undefined;
};

export type R4NlCoreContactInformationTelephoneNumbers = MgoElementMeta<typeof profileTelephone> & {
    comment: MgoString | undefined;
    system: {
        telecomType: MgoCodeableConcept | undefined;
    };
    value: MgoString | undefined;
    use: MgoCode | undefined;
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628397 (email)
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628398 (phone)
 */
export function parseNlCoreContactInformation(
    value: Nullable<ContactPoint[]>
): R4NlCoreContactInformation {
    const telephoneNumbers: R4NlCoreContactInformationTelephoneNumbers[] = [];
    const emailAddresses: R4NlCoreContactInformationEmailAddresses[] = [];

    if (!value) {
        return { telephoneNumbers, emailAddresses };
    }

    for (const contact of value) {
        if (contact?.system === 'email') {
            emailAddresses.push({
                _profile: profileEmail,
                value: parse.string(contact?.value),
                use: parse.code(contact?.use),
            });
        } else if (contact?.system === 'phone') {
            telephoneNumbers.push({
                _profile: profileTelephone,
                comment: parse.extension(
                    contact,
                    'http://nictiz.nl/fhir/StructureDefinition/ext-Comment', // NOSONAR
                    'string'
                ),
                system: {
                    telecomType: parse.extension(
                        contact?._system,
                        'http://nictiz.nl/fhir/StructureDefinition/ext-CodeSpecification', // NOSONAR
                        'codeableConcept'
                    ),
                },
                value: parse.string(contact?.value),
                use: parse.code(contact?.use),
            });
        }
    }

    return {
        telephoneNumbers,
        emailAddresses,
    };
}
