import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type PractitionerRole } from 'fhir/r4';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { map } from '../../../utils';
import { parseNlCoreContactInformation } from '../../elements';
import { uiSchema } from './uiSchema';

const profile =
    'http://nictiz.nl/fhir/StructureDefinition/nl-core-HealthProfessional-PractitionerRole'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628465
 */
function parseNlCoreHealthProfessionalPractitionerRole(resource: PractitionerRole) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R4),
        practitioner: parse.reference(resource.practitioner),
        organization: parse.reference(resource.organization),
        location: map(resource.location, parse.reference),
        speciality: map(resource.specialty, parse.codeableConcept),
        telecom: parseNlCoreContactInformation(resource.telecom),
    };
}

export type R4NlCoreHealthProfessionalPractitionerRole = ReturnType<
    typeof parseNlCoreHealthProfessionalPractitionerRole
>;

export const nlCoreHealthProfessionalPractitionerRole = {
    profile,
    parse: parseNlCoreHealthProfessionalPractitionerRole,
    uiSchema,
} satisfies ResourceConfig<PractitionerRole, R4NlCoreHealthProfessionalPractitionerRole>;
