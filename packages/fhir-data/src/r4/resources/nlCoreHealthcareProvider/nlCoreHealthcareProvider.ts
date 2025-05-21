import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Location } from 'fhir/r4';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { map } from '../../../utils';
import { parseNlCoreAddressInformation, parseNlCoreContactInformation } from '../../elements';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/nl-core-HealthcareProvider'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946116
 */
function parseNlCoreHealthcareProvider(resource: Location) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R4),
        identifier: map(resource.identifier, parse.identifier),
        name: parse.string(resource.name),
        telecom: parseNlCoreContactInformation(resource.telecom),
        address: parseNlCoreAddressInformation(resource.address),
        managingOrganization: parse.reference(resource.managingOrganization),
    };
}

export type R4NlCoreHealthcareProvider = ReturnType<typeof parseNlCoreHealthcareProvider>;

export const nlCoreHealthcareProvider = {
    profile,
    parse: parseNlCoreHealthcareProvider,
    uiSchema,
} satisfies ResourceConfig<Location, R4NlCoreHealthcareProvider>;
