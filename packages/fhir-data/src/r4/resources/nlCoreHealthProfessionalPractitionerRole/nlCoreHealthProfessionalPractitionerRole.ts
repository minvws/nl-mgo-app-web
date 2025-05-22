import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type PractitionerRole } from 'fhir/r4';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';
import { parseNlCoreContactInformation } from '../../elements';

const profile =
    'http://nictiz.nl/fhir/StructureDefinition/nl-core-HealthProfessional-PractitionerRole'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628465 (nl core HealthProfessional PractitionerRole)
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.zib2020/0.11.0-beta.1/files/2628201 (zib HealthProfessional PractitionerRole)
 */
function parseNlCoreHealthProfessionalPractitionerRole(resource: PractitionerRole) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R4),

        // zib ContactInformation-v1.2(2020EN)
        telecom: parseNlCoreContactInformation(resource.telecom),

        // zib HealthProfessional-v3.5(2020EN)
        organization: parse.reference(resource.organization),
        speciality: map(resource.specialty, parse.codeableConcept),
    };
}

export type R4NlCoreHealthProfessionalPractitionerRole = ReturnType<
    typeof parseNlCoreHealthProfessionalPractitionerRole
>;

export const nlCoreHealthProfessionalPractitionerRole = {
    profile,
    parse: parseNlCoreHealthProfessionalPractitionerRole,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<PractitionerRole, R4NlCoreHealthProfessionalPractitionerRole>;
