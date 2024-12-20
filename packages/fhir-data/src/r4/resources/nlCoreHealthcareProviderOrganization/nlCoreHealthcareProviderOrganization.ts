import { type Organization } from 'fhir/r4';
import { parse } from '../../../parse';
import { FhirVersion } from '../../../types/Fhir';
import { type ResourceConfigR4 } from '../config';
import { uiSchema } from './uiSchema';
import { map } from '../../../utils';
import {
    nlCoreAddressInformation,
    nlCoreContactInformationEmailAddresses,
    nlCoreContactInformationTelephoneNumbers,
} from '../../elements';
import { filterCodeableConceptByCoding } from '../../../parse/helpers';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/nl-core-HealthcareProvider-Organization'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946118
 */
function parseNlCoreHealthcareProviderOrganization(resource: Organization) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R4),
        identifier: map(resource.identifier, parse.identifier),
        departmentSpecialty: map(
            filterCodeableConceptByCoding(
                resource.type,
                (x) => x.system === 'urn:oid:2.16.840.1.113883.2.4.6.7'
            ),
            parse.codeableConcept
        ),
        organizationType: map(
            filterCodeableConceptByCoding(
                resource.type,
                (x) => x.system === 'http://nictiz.nl/fhir/NamingSystem/organization-type' // NOSONAR
            ),
            parse.codeableConcept
        ),
        name: parse.string(resource.name),
        telephoneNumbers: map(resource.telecom, nlCoreContactInformationTelephoneNumbers.parse),
        emailAddresses: map(resource.telecom, nlCoreContactInformationEmailAddresses.parse),
        address: map(resource.address, nlCoreAddressInformation.parse),
    };
}

export type NlCoreHealthcareProviderOrganization = ReturnType<
    typeof parseNlCoreHealthcareProviderOrganization
>;

export const nlCoreHealthcareProviderOrganization = {
    profile,
    parse: parseNlCoreHealthcareProviderOrganization,
    uiSchema,
} satisfies ResourceConfigR4<Organization, NlCoreHealthcareProviderOrganization>;
