import { type Practitioner } from '@minvws/mgo-fhir/r4';
import { parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { type ResourceConfig } from '../../../resourceTypes.js';
import {
    parseNlCoreAddressInformation,
    parseNlCoreContactInformation,
    parseNlCoreNameInformation,
} from '../../elements/index.js';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/nl-core-HealthProfessional-Practitioner'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628463
 */
function parseNlCoreHealthProfessionalPractitioner(resource: Practitioner) {
    return {
        ...parse.resourceMeta(resource, profile, 'R4'),

        // zib HealthProfessional-v3.5(2020EN)
        identifier: map(resource.identifier, parse.identifier),
        name: map(resource.name, parseNlCoreNameInformation),
        telecom: parseNlCoreContactInformation(resource.telecom),
        address: map(resource.address, parseNlCoreAddressInformation),
        gender: parse.code(resource.gender),
    };
}

export type R4NlCoreHealthProfessionalPractitioner = ReturnType<
    typeof parseNlCoreHealthProfessionalPractitioner
>;

export const r4NlCoreHealthProfessionalPractitioner = {
    profile,
    parse: parseNlCoreHealthProfessionalPractitioner,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<'R4', Practitioner, R4NlCoreHealthProfessionalPractitioner>;
