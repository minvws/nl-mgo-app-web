import { FhirVersion } from '@minvws/mgo-fhir';
import { type Observation } from '@minvws/mgo-fhir/r3';
import { parse, parseObservationComponents } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { type ResourceConfig } from 'src/resourceTypes.js';
import { omitUndefined } from '../../../utils/index.js';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation.js';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-ParticipationInSociety'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.3.1/files/2980686/
 */
function parseZibParticipationInSociety(resource: Observation) {
    const { comment, effectiveDateTime, effectivePeriod, identifier, performer, subject } =
        parseNlCoreObservationBase(resource);

    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier,
        subject,
        ...omitUndefined({
            effectiveDateTime,
            effectivePeriod,
        }),
        performer,

        // HCIM ParticipationInSociety-v3.1(2017EN)
        comment,
        component: {
            ...parseObservationComponents(resource.component, {
                socialNetwork: {
                    coding: {
                        system: 'http://snomed.info/sct', // NOSONAR
                        code: '365469004',
                    },
                    type: 'string',
                },
                hobby: {
                    coding: {
                        system: 'http://snomed.info/sct', // NOSONAR
                        code: '405081003',
                    },
                    type: 'string',
                },
                workSituation: {
                    coding: {
                        system: 'http://snomed.info/sct', // NOSONAR
                        code: '364703007',
                    },
                    type: 'string',
                },
            }),
        },
    };
}

export type ZibParticipationInSociety = ReturnType<typeof parseZibParticipationInSociety>;

export const zibParticipationInSociety = {
    profile,
    parse: parseZibParticipationInSociety,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, Observation, ZibParticipationInSociety>;
