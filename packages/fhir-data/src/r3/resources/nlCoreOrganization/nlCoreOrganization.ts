import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Organization } from 'fhir/r3';
import { parse } from '../../../parse';
import { filterCodeableConcept } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../types';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';
import { parseNlCoreAddress, parseNlCoreContactpoint } from '../../elements';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-organization'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317033
 */
function parseNlCoreOrganization(resource: Organization) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),

        // HCIM Payer-v3.1(2017EN)
        name: parse.string(resource.name),
        alias: map(resource.alias, parse.string),

        // HCIM ContactInformation-v1.0(2017EN)
        telecom: map(resource.telecom, parseNlCoreContactpoint),
        address: map(resource.address, parseNlCoreAddress),

        // HCIM HealthcareProvider-v3.1.1(2017EN)
        type: {
            organizationType: map(
                filterCodeableConcept(resource.type, {
                    system: 'http://nictiz.nl/fhir/NamingSystem/organization-type', // NOSONAR
                }),
                parse.codeableConcept
            ),
            departmentSpecialty: map(
                filterCodeableConcept(resource.type, {
                    system: 'urn:oid:2.16.840.1.113883.2.4.6.7',
                }),
                parse.codeableConcept
            ),
        },
    };
}

export type NlCoreOrganization = ReturnType<typeof parseNlCoreOrganization>;

export const nlCoreOrganization = {
    profile,
    parse: parseNlCoreOrganization,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Organization, NlCoreOrganization>;
