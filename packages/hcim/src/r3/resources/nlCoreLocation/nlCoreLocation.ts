import { FhirVersion } from '@minvws/mgo-fhir';
import { type Location } from '@minvws/mgo-fhir/r3';
import { parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { parseNlCoreAddress, parseNlCoreContactpoint } from 'src/r3/elements/index.js';
import { ResourceConfig } from 'src/resourceTypes.js';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-location'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317029
 */
function parseNlCoreLocation(resource: Location) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM HealthcareProvider-v3.1.1(2017EN)
        // HCIM MedicationDispense-v2.0(2017EN)
        // HCIM Dispense-v1.0(2017EN)
        // ART-DECOR Dataset eAfspraak
        name: parse.string(resource.name),
        managingOrganization: parse.reference(resource.managingOrganization),
        physicalType: parse.codeableConcept(resource.physicalType),

        // HCIM ContactInformation-v1.0(2017EN)
        telecom: map(resource.telecom, parseNlCoreContactpoint),

        // HCIM AddressInformation-v1.0(2017EN)
        address: parseNlCoreAddress(resource.address),
    };
}

export type NlCoreLocation = ReturnType<typeof parseNlCoreLocation>;

export const nlCoreLocation = {
    profile,
    parse: parseNlCoreLocation,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, Location, NlCoreLocation>;
