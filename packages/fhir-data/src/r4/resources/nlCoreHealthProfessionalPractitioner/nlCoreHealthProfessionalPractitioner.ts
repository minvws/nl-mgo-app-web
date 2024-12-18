import { type Practitioner } from 'fhir/r4';
import { parse } from '../../../parse';
import { FhirVersion } from '../../../types/Fhir';
import { type ResourceConfigR4 } from '../config';
import { uiSchema } from './uiSchema';
import { map } from '../../../utils';
import {
    nlCoreNameInformation,
    nlCoreAddressInformation,
    nlCoreContactInformationEmailAddresses,
    nlCoreContactInformationTelephoneNumbers,
} from '../../elements';
import { qualification } from './elements/qualification/qualification';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/nl-core-HealthProfessional-Practitioner'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946120
 */
function parseNlCoreHealthProfessionalPractitioner(resource: Practitioner) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R4),
        identifier: map(resource.identifier, parse.identifier), // NL-CM:17.1.2
        name: map(resource.name, nlCoreNameInformation.parse), // NL-CM:17.1.3
        telephoneNumbers: map(resource.telecom, nlCoreContactInformationTelephoneNumbers.parse), // NL-CM-20.6.2
        emailAddresses: map(resource.telecom, nlCoreContactInformationEmailAddresses.parse), // NL-CM-20.6.3
        address: map(resource.address, nlCoreAddressInformation.parse), // NL-CM:17.1.7
        gender: parse.code(resource.gender), // NL-CM:17.1.9
        birthDate: parse.date(resource.birthDate),
        qualification: map(resource.qualification, qualification.parse),
        communication: map(resource.communication, parse.codeableConcept),
    };
}

export type R4NlCoreHealthProfessionalPractitioner = ReturnType<
    typeof parseNlCoreHealthProfessionalPractitioner
>;

export const r4NlCoreHealthProfessionalPractitioner = {
    profile,
    parse: parseNlCoreHealthProfessionalPractitioner,
    uiSchema,
} satisfies ResourceConfigR4<Practitioner, R4NlCoreHealthProfessionalPractitioner>;
