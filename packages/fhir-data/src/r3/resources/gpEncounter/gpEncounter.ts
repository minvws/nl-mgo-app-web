import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Encounter } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { map } from '../../../utils';
import { encounterParticipant } from '../../elements/encounterParticipant/encounterParticipant';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/gp-Encounter'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316991
 */
function parseGpEncounter(resource: Encounter) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        class: parse.coding(resource.class),
        participant: map(resource.participant, encounterParticipant.parse),
        serviceProvider: parse.reference(resource.serviceProvider),
        period: parse.period(resource.period),
        reason: map(resource.reason, parse.codeableConcept),
    };
}

export type GpEncounter = ReturnType<typeof parseGpEncounter>;

export const gpEncounter = {
    profile,
    parse: parseGpEncounter,
    uiSchema,
} satisfies ResourceConfig<Encounter, GpEncounter>;
