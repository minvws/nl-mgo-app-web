import { parse } from '../../parse';
import { type ResourceConfig } from '../config';
import { uiSchema } from './uiSchema';
import { map } from '../../utils';
import { nlCoreAddress, nlCoreContactpoint, nlCoreHumanname } from '../../elements';
import { type Practitioner } from '../../fhir';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-practitioner';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
function parseNlCorePractitioner(resource: Practitioner) {
    console.log(resource);
    return {
        ...parse.resourceMeta(resource, profile),
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
