import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Encounter } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { map } from '../../../utils';
import { encounterParticipant } from '../../elements/encounterParticipant/encounterParticipant';
import { diagnosis } from './elements/diagnosis/diagnosis';
import { hospitalization } from './elements/hospitalization/hospitalization';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-Encounter'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317177
 */
function parseZibEncounter(resource: Encounter) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        class: parse.coding(resource.class),
        participant: map(resource.participant, encounterParticipant.parse),
        serviceProvider: parse.reference(resource.serviceProvider),
        period: parse.period(resource.period),
        diagnosis: map(resource.diagnosis, diagnosis.parse),
        reason: map(resource.reason, parse.codeableConcept),
        hospitalization: hospitalization.parse(resource.hospitalization),
    };
}

export type ZibEncounter = ReturnType<typeof parseZibEncounter>;

export const zibEncounter = {
    profile,
    parse: parseZibEncounter,
    uiSchema,
} satisfies ResourceConfig<Encounter, ZibEncounter>;
