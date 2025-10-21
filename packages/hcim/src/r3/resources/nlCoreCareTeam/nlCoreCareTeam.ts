import { FhirVersion } from '@minvws/mgo-fhir';
import { type CareTeam } from '@minvws/mgo-fhir/r3';
import { parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { type ResourceConfig } from 'src/resourceTypes.js';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-careteam'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.20/files/2741659
 */
function parseNlCoreCareTeam(resource: CareTeam) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        subject: parse.reference(resource.subject),
        period: parse.period(resource.period),

        participant: map(resource.participant, (participant) => ({
            participant: parse.reference(participant.member),
            // HCIM HealthProfessional-v3.2(2017EN)
            healthProfessionalRole: parse.codeableConcept(participant.role),
        })),
    };
}

export type NlCoreCareTeam = ReturnType<typeof parseNlCoreCareTeam>;

export const nlCoreCareTeam = {
    profile,
    parse: parseNlCoreCareTeam,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, CareTeam, NlCoreCareTeam>;
