import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Location } from 'fhir/r4';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types/Fhir';
import { map } from '../../../utils';
import {
    nlCoreAddressInformation,
    nlCoreContactInformationEmailAddresses,
    nlCoreContactInformationTelephoneNumbers,
} from '../../elements';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/nl-core-HealthcareProvider'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946116
 */
function parseNlCoreHealtcareProvider(resource: Location) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R4),
        identifier: map(resource.identifier, parse.identifier),
        name: parse.string(resource.name),
        telephoneNumbers: map(resource.telecom, nlCoreContactInformationTelephoneNumbers.parse),
        emailAddresses: map(resource.telecom, nlCoreContactInformationEmailAddresses.parse),
        address: nlCoreAddressInformation.parse(resource.address),
        managingOrganization: parse.reference(resource.managingOrganization),
    };
}

export type R4NlCoreHealtcareProvider = ReturnType<typeof parseNlCoreHealtcareProvider>;

export const nlCoreHealtcareProvider = {
    profile,
    parse: parseNlCoreHealtcareProvider,
    uiSchema,
} satisfies ResourceConfig<Location, R4NlCoreHealtcareProvider>;
