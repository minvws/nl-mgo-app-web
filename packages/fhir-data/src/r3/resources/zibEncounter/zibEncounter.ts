import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Encounter } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../resourceTypes';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-Encounter'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317177
 */
export function parseZibEncounterBase(resource: Encounter) {
    return {
        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        subject: parse.reference(resource.subject),
        period: parse.period(resource.period),
        participant: map(resource.participant, (participant) => ({
            // HCIM Encounter-v3.1(2017EN)
            individual: parse.reference(participant.individual),

            // HCIM HealthProfessional-v3.2(2017EN)
            type: {
                healthProfessionalRole: map(participant.type, parse.codeableConcept),
            },
        })),

        // HCIM Encounter-v3.1(2017EN)
        reason: map(resource.reason, parse.codeableConcept),
        class: parse.coding(resource.class),
        diagnosis: map(resource.diagnosis, (diagnosis) => ({
            condition: parse.reference(diagnosis?.condition),
        })),
        hospitalization: {
            admitSource: parse.codeableConcept(resource.hospitalization?.admitSource),
            dischargeDisposition: parse.codeableConcept(
                resource.hospitalization?.dischargeDisposition
            ),
        },
        serviceProvider: parse.reference(resource.serviceProvider),
    };
}

export function parseZibEncounter(resource: Encounter) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        ...parseZibEncounterBase(resource),
    };
}

export type ZibEncounter = ReturnType<typeof parseZibEncounter>;

export const zibEncounter = {
    profile,
    parse: parseZibEncounter,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Encounter, ZibEncounter>;
