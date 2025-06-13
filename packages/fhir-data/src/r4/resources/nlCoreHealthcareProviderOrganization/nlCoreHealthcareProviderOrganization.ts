import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Organization } from 'fhir/r4';
import { parse } from '../../../parse';
import { filterCodeableConcept } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../resourceTypes';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';
import { parseNlCoreAddressInformation, parseNlCoreContactInformation } from '../../elements';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/nl-core-HealthcareProvider-Organization'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628461
 */
function parseNlCoreHealthcareProviderOrganization(resource: Organization) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R4),

        // zib HealthcareProvider-v3.4(2020EN)
        identifier: map(resource.identifier, parse.identifier),
        type: {
            departmentSpecialty: map(
                filterCodeableConcept(resource.type, {
                    system: 'urn:oid:2.16.840.1.113883.2.4.6.7',
                }),
                parse.codeableConcept
            ),
            organizationType: map(
                filterCodeableConcept(
                    resource.type,
                    { system: 'http://nictiz.nl/fhir/NamingSystem/organization-type' } // NOSONAR
                ),
                parse.codeableConcept
            ),
        },
        name: parse.string(resource.name),
        address: map(resource.address, parseNlCoreAddressInformation),
        telecom: parseNlCoreContactInformation(resource.telecom),
    };
}

export type R4NlCoreHealthcareProviderOrganization = ReturnType<
    typeof parseNlCoreHealthcareProviderOrganization
>;

export const nlCoreHealthcareProviderOrganization = {
    profile,
    parse: parseNlCoreHealthcareProviderOrganization,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Organization, R4NlCoreHealthcareProviderOrganization>;
