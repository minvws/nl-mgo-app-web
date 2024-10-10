import { type Encounter } from '../../fhir/index';
import { parse } from '../../parse';
import { map } from '../../utils';
import { type ResourceConfig } from '../config';
import { diagnosis } from './elements/diagnosis/diagnosis';
import { hospitalization } from './elements/hospitalization/hospitalization';
import { participant } from './elements/participant/participant';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-Encounter';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317177
 */
function parseZibEncounter(resource: Encounter) {
    return {
        ...parse.resourceMeta(resource, profile),
        class: parse.coding(resource.class),
        participant: map(resource.participant, participant.parse),
        serviceProvider: parse.reference(resource.serviceProvider),
        period: parse.period(resource.period),
        diagnosis: map(resource.diagnosis, diagnosis.parse),
        // TODO: verrichting?
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
