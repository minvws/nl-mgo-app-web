import { FhirVersion } from '@minvws/mgo-fhir';
import { parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { type Location } from 'fhir/r4';
import { type ResourceConfig } from '../../../resourceTypes';
import { parseNlCoreAddressInformation, parseNlCoreContactInformation } from '../../elements';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/nl-core-HealthcareProvider'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628459
 */
function parseNlCoreHealthcareProvider(resource: Location) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R4),

        // zib ContactInformation-v1.2(2020EN)
        telecom: parseNlCoreContactInformation(resource.telecom),

        // zib HealthcareProvider-v3.4(2020EN)
        name: parse.string(resource.name),
        address: parseNlCoreAddressInformation(resource.address),
        managingOrganization: parse.reference(resource.managingOrganization),
    };
}

export type R4NlCoreHealthcareProvider = ReturnType<typeof parseNlCoreHealthcareProvider>;

export const nlCoreHealthcareProvider = {
    profile,
    parse: parseNlCoreHealthcareProvider,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Location, R4NlCoreHealthcareProvider>;
