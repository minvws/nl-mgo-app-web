import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type PractitionerRole } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types/Fhir';
import { map } from '../../../utils';
import { nlCoreContactpoint } from '../../elements';
import { uiSchema } from './uiSchema';

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
} satisfies ResourceConfig<PractitionerRole, NlCorePractitionerRole>;
