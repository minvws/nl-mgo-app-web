import { nlCoreAddress, nlCoreContactpoint } from '../../elements';
import { type Organization } from '../../fhir/index';
import { parse } from '../../parse';
import { filterCodeableConceptByCoding } from '../../parse/helpers';
import { map } from '../../utils';
import { type ResourceConfig } from '../config';
import { uiSchema } from './uiSchema';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-organization';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317033
 */
function parseNlCoreOrganization(resource: Organization) {
    return {
        ...parse.resourceMeta(resource, profile),
        identifier: map(resource.identifier, parse.identifier),
        name: parse.string(resource.name),
        departmentSpecialty: map(
            filterCodeableConceptByCoding(
                resource.type,
                (x) => x.system === 'urn:oid:2.16.840.1.113883.2.4.6.7'
            ),
            parse.codeableConcept
        ),
        telecom: map(resource.telecom, nlCoreContactpoint.parse),
        address: map(resource.address, nlCoreAddress.parse),
        organizationType: map(
            filterCodeableConceptByCoding(
                resource.type,
                (x) => x.system === 'http://nictiz.nl/fhir/NamingSystem/organization-type'
            ),
            parse.codeableConcept
        ),
    };
}

export type NlCoreOrganization = ReturnType<typeof parseNlCoreOrganization>;

export const nlCoreOrganization = {
    profile,
    parse: parseNlCoreOrganization,
    uiSchema,
} satisfies ResourceConfig<Organization, NlCoreOrganization>;
