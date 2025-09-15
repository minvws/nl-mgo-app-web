import { FhirVersion } from '@minvws/mgo-fhir';
import { type Practitioner } from '@minvws/mgo-fhir/r3';
import { parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { type ResourceConfig } from '../../../resourceTypes.js';
import {
    parseNlCoreAddress,
    parseNlCoreContactpoint,
    parseNlCoreHumanname,
} from '../../elements/index.js';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-practitioner'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.20/files/2741687
 */
function parseNlCorePractitioner(resource: Practitioner) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: {
            uzi: parse.identifier(
                resource.identifier?.find(
                    (x) => x.system === 'http://fhir.nl/fhir/NamingSystem/uzi-nr-pers' // NOSONAR
                )
            ),
            agb: parse.identifier(
                resource.identifier?.find(
                    (x) => x.system === 'http://fhir.nl/fhir/NamingSystem/agb-z' // NOSONAR
                )
            ),
            big: parse.identifier(
                resource.identifier?.find(
                    (x) => x.system === 'http://fhir.nl/fhir/NamingSystem/big' // NOSONAR
                )
            ),
            other: map(
                resource.identifier?.filter(
                    (x) =>
                        x.system !== 'http://fhir.nl/fhir/NamingSystem/uzi-nr-pers' && // NOSONAR
                        x.system !== 'http://fhir.nl/fhir/NamingSystem/agb-z' && // NOSONAR
                        x.system !== 'http://fhir.nl/fhir/NamingSystem/big' // NOSONAR
                ),
                parse.identifier
            ),
        },

        // HCIM ContactInformation-v1.0(2017EN)
        telecom: map(resource.telecom, parseNlCoreContactpoint),

        // HCIM HealthProfessional-v3.2(2017EN)
        name: map(resource.name, parseNlCoreHumanname),
        address: map(resource.address, parseNlCoreAddress),
    };
}

export type NlCorePractitioner = ReturnType<typeof parseNlCorePractitioner>;

export const nlCorePractitioner = {
    profile,
    parse: parseNlCorePractitioner,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, Practitioner, NlCorePractitioner>;
