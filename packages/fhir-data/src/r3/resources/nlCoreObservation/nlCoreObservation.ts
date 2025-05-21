import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Observation } from 'fhir/r3';
import { parse } from '../../../parse';
import { oneOfValueX } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../types';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-observation'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317032
 */
export function parseNlCoreObservationBase(resource: Observation) {
    return {
        identifier: map(resource.identifier, parse.identifier),
        subject: parse.reference(resource.subject),
        ...oneOfValueX(resource, ['dateTime', 'period'], 'effective'),
        performer: map(resource.performer, parse.reference),
        ...oneOfValueX(resource, [
            'quantity',
            'codeableConcept',
            'string',
            'boolean',
            'range',
            'ratio',
            'sampledData',
            'attachment',
            'time',
            'dateTime',
            'period',
        ]),
        method: parse.codeableConcept(resource.method),
        bodySite: parse.codeableConcept(resource.bodySite),
        comment: parse.string(resource.comment),
    };
}

function parseNlCoreObservation(resource: Observation) {
    const { effectiveDateTime, effectivePeriod, identifier, performer, subject } =
        parseNlCoreObservationBase(resource);

    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier,
        subject,
        effectiveDateTime,
        effectivePeriod,
        performer,
    };
}

export type NlCoreObservation = ReturnType<typeof parseNlCoreObservation>;

export const nlCoreObservation = {
    profile,
    parse: parseNlCoreObservation,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Observation, NlCoreObservation>;
