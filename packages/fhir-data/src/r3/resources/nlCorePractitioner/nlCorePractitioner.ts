import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Practitioner } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { map } from '../../../utils';
import { nlCoreAddress, nlCoreContactpoint, parseNlCoreHumanname } from '../../elements';
import { uiSchema } from './uiSchema';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-practitioner'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
function parseNlCorePractitioner(resource: Practitioner) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        identifier: map(resource.identifier, parse.identifier),
        name: map(resource.name, parseNlCoreHumanname),
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
