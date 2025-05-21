import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Observation } from 'fhir/r3';
import { parse } from '../../../parse';
import { parseObservationComponents } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../types';
import { generateUiSchema } from '../../../ui/generator';
import { omitUndefined } from '../../../utils';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/gp-JournalEntry'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316995
 */
function parseGpJournalEntry(resource: Observation) {
    const { identifier, subject, effectiveDateTime, effectivePeriod, performer, valueString } =
        parseNlCoreObservationBase(resource);

    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        identifier,
        subject,
        performer,
        valueString,

        ...omitUndefined({
            effectiveDateTime,
            effectivePeriod,
        }),

        code: parse.codeableConcept(resource.code),
        episodeOfCare: parse.extensionMultiple(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/extension-context-nl-core-episodeofcare', // NOSONAR
            'reference'
        ),

        component: parseObservationComponents(resource.component, {
            ICPC_S: {
                coding: {
                    system: 'http://hl7.org/fhir/v3/ActCode', // NOSONAR
                    code: 'ADMDX',
                },
                type: 'codeableConcept',
            },
            ICPC_E: {
                coding: {
                    system: 'http://hl7.org/fhir/v3/ActCode', // NOSONAR
                    code: 'DISDX',
                },
                type: 'codeableConcept',
            },
        }),
    };
}

export type GpJournalEntry = ReturnType<typeof parseGpJournalEntry>;

export const gpJournalEntry = {
    profile,
    parse: parseGpJournalEntry,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Observation, GpJournalEntry>;
