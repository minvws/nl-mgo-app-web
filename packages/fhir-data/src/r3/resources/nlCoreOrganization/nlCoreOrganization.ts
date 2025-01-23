import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Organization } from 'fhir/r3';
import { parse } from '../../../parse';
import { filterCodeableConceptByCoding } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../types/Fhir';
import { map } from '../../../utils';
import { nlCoreAddress, nlCoreContactpoint } from '../../elements';
import { uiSchema } from './uiSchema';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-organization'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317033
 */
function parseNlCoreOrganization(resource: Organization) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
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
                (x) => x.system === 'http://nictiz.nl/fhir/NamingSystem/organization-type' // NOSONAR
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
