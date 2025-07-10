import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Appointment } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../resourceTypes';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/eAfspraak-Appointment'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.eafspraak/1.0.6/files/714361/
 */
function parseEAfspraakAppointment(resource: Appointment) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        start: parse.dateTime(resource.start),

        // HCIM PlannedCareActivityForTransfer-v3.1(2017EN)
        status: {
            // ART-DECOR Dataset eAfspraak
            ...parse.code(resource.status),
            orderStatus: parse.extension(
                resource._status,
                'http://nictiz.nl/fhir/StructureDefinition/code-specification', // NOSONAR
                'codeableConcept'
            ),
        },
        end: parse.dateTime(resource.end),

        // ART-DECOR Dataset eAfspraak
        patientInstructions: parse.extensionMultiple(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/eAfspraak-Appointment-PatientInstructions', // NOSONAR
            'string'
        ),
        onlineEditable: parse.customExtension(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/eAfspraak-Appointment-OnlineEditable', // NOSONAR
            (onlineEditable) => {
                return {
                    indicator: parse.extension(onlineEditable, 'Indicator', 'boolean'),
                    onlineEditableUntil: parse.extension(
                        onlineEditable,
                        'OnlineEditableUntil',
                        'dateTime'
                    ),
                };
            }
        ),
        serviceCategory: parse.codeableConcept(resource.serviceCategory),
        specialty: map(resource.specialty, parse.codeableConcept),
        appointmentType: parse.codeableConcept(resource.appointmentType),
        reason: map(resource.reason, parse.codeableConcept),
        indication: map(resource.indication, parse.reference),
        description: parse.string(resource.description),
        minutesDuration: parse.positiveInt(resource.minutesDuration),
        created: parse.dateTime(resource.created),
        incomingReferral: map(resource.incomingReferral, parse.reference),
        participant: map(resource.participant, (participant) => ({
            actor: parse.reference(participant.actor),
            required: parse.code(participant.required),
            status: parse.code(participant.status),
            // HCIM HealthProfessional-v3.2(2017EN)
            type: {
                healthProfessionalRole: map(participant?.type, parse.codeableConcept),
            },
        })),
    };
}

export type EAfspraakAppointment = ReturnType<typeof parseEAfspraakAppointment>;

export const eAfspraakAppointment = {
    profile,
    parse: parseEAfspraakAppointment,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Appointment, EAfspraakAppointment>;
