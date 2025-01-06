import { parse } from '../../../parse';
import { uiSchema } from './uiSchema';
import { map } from '../../../utils';
import { nlCoreAddress, nlCoreHumanname, nlCoreContactpoint } from '../../elements';
import { type Practitioner } from 'fhir/r3';
import { FhirVersion, type ResourceConfig } from '../../../types/Fhir';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-practitioner'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
function parseNlCorePractitioner(resource: Practitioner) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        identifier: map(resource.identifier, parse.identifier),
        name: map(resource.name, nlCoreHumanname.parse),
        address: map(resource.address, nlCoreAddress.parse),
        telecom: map(resource.telecom, nlCoreContactpoint.parse),
    };
}

export type NlCorePractitioner = ReturnType<typeof parseNlCorePractitioner>;

export const nlCorePractitioner = {
    profile,
    parse: parseNlCorePractitioner,
    uiSchema,
} satisfies ResourceConfig<Practitioner, NlCorePractitioner>;
