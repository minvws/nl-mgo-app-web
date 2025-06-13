import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type PractitionerRole } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../resourceTypes';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';
import { parseNlCoreContactpoint } from '../../elements';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-practitionerrole'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317053
 */
function parseNlCorePractitionerRole(resource: PractitionerRole) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),

        // HCIM ContactInformation-v1.0(2017EN)
        telecom: map(resource.telecom, parseNlCoreContactpoint),

        // HCIM HealthProfessional-v3.2(2017EN)
        organization: parse.reference(resource.organization),
        specialty: parse.codeableConcept(resource.specialty?.[0]),
    };
}

export type NlCorePractitionerRole = ReturnType<typeof parseNlCorePractitionerRole>;

export const nlCorePractitionerRole = {
    profile,
    parse: parseNlCorePractitionerRole,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<PractitionerRole, NlCorePractitionerRole>;
