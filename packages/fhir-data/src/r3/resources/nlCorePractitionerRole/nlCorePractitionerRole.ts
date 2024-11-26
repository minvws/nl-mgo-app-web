import { type PractitionerRole } from 'fhir/r3';
import { FhirVersion } from '../../../types/Fhir';
import { parse } from '../../../parse';
import { map } from '../../../utils';
import { type ResourceConfigR3 } from '../config';
import { uiSchema } from './uiSchema';
import { nlCoreContactpoint } from '../../elements';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-practitionerrole'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317053
 */
function parseNlCorePractitionerRole(resource: PractitionerRole) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        identifier: map(resource.identifier, parse.identifier),
        organization: parse.reference(resource.organization),
        specialty: map(resource.specialty, parse.codeableConcept),
        telecom: map(resource.telecom, nlCoreContactpoint.parse),
    };
}

export type NlCorePractitionerRole = ReturnType<typeof parseNlCorePractitionerRole>;

export const nlCorePractitionerRole = {
    profile,
    parse: parseNlCorePractitionerRole,
    uiSchema,
} satisfies ResourceConfigR3<PractitionerRole, NlCorePractitionerRole>;
