import { nlCoreContactpoint } from '../../elements';
import { type PractitionerRole } from '../../fhir';
import { parse } from '../../parse';
import { map } from '../../utils';
import { type ResourceConfig } from '../config';
import { uiSchema } from './uiSchema';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-practitionerrole';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317053
 */
function parseNlCorePractitionerRole(resource: PractitionerRole) {
    console.log(resource);
    return {
        ...parse.resourceMeta(resource, profile),
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
} satisfies ResourceConfig<PractitionerRole, NlCorePractitionerRole>;
