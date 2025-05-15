import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Encounter } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { generateUiSchema } from '../../../ui/generator';
import { parseZibEncounterBase } from '../zibEncounter/zibEncounter';

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
} satisfies ResourceConfig<Encounter, GpEncounter>;
