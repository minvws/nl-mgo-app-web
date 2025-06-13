import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type PractitionerRole } from 'fhir/r4';
import { parse } from '../../../parse';
import { filterCodeableConcept } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../resourceTypes';
import { generateUiSchema } from '../../../ui/generator';
import { parseNlCoreContactInformation } from '../../elements';

const profile =
    'http://nictiz.nl/fhir/StructureDefinition/nl-core-HealthProfessional-PractitionerRole'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628465
 */
function parseNlCoreHealthProfessionalPractitionerRole(resource: PractitionerRole) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R4),

        // zib ContactInformation-v1.2(2020EN)
        telecom: parseNlCoreContactInformation(resource.telecom),

        // zib HealthProfessional-v3.5(2020EN)
        organization: parse.reference(resource.organization),
        specialty: {
            specialty: parse.codeableConcept(
                filterCodeableConcept(resource.specialty, [
                    { system: 'http://fhir.nl/fhir/NamingSystem/uzi-rolcode' }, // NOSONAR
                    { system: 'urn:oid:2.16.840.1.113883.2.4.6.7' },
                ])?.[0]
            ),
        },
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
