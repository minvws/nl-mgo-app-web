import { FhirVersion } from '@minvws/mgo-fhir';
import { type Encounter } from '@minvws/mgo-fhir/r3';
import { parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { type ResourceConfig } from '../../../resourceTypes.js';
import { parseZibEncounterBase } from '../zibEncounter/zibEncounter.js';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/gp-Encounter'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316991
 */
function parseGpEncounter(resource: Encounter) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        ...parseZibEncounterBase(resource),
    };
}

export type GpEncounter = ReturnType<typeof parseGpEncounter>;

export const gpEncounter = {
    profile,
    parse: parseGpEncounter,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, Encounter, GpEncounter>;
