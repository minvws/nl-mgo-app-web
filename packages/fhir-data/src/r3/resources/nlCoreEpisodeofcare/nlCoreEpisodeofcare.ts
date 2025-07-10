import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type EpisodeOfCare } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../resourceTypes';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-episodeofcare'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317023
 */
function parseNlCoreEpisodeofcare(resource: EpisodeOfCare) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        patient: parse.reference(resource.patient),
        period: parse.period(resource.period),

        // HCIM ConcernForTransfer-v1.2(2015EN)
        type: map(resource.type, parse.codeableConcept),
        title: parse.extension(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/EpisodeOfCare-Title', // NOSONAR
            'string'
        ),
    };
}

export type NlCoreEpisodeofcare = ReturnType<typeof parseNlCoreEpisodeofcare>;

export const nlCoreEpisodeofcare = {
    profile,
    parse: parseNlCoreEpisodeofcare,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<EpisodeOfCare, NlCoreEpisodeofcare>;
