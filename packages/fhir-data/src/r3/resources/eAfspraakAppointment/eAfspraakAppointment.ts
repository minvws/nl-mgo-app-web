import { type Appointment } from 'fhir/r3';
import { parse } from '../../../parse';
import { FhirVersion } from '../../../types/Fhir';
import { map } from '../../../utils';
import { type ResourceConfigR3 } from '../config';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/eAfspraak-Appointment'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.eafspraak/1.0.6/files/714361/
 */
function parseEAfspraakAppointment(resource: Appointment) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        status: parse.string(resource.status),
        specialty: map(resource.specialty, parse.codeableConcept),
        description: parse.string(resource.description),
        start: parse.dateTime(resource.start),
        end: parse.dateTime(resource.end),
        participant: map(resource.participant, (x) => ({ actor: parse.reference(x.actor) })),
    };
}

export type EAfspraakAppointment = ReturnType<typeof parseEAfspraakAppointment>;

export const eAfspraakAppointment = {
    profile,
    parse: parseEAfspraakAppointment,
    uiSchema,
} satisfies ResourceConfigR3<Appointment, EAfspraakAppointment>;
