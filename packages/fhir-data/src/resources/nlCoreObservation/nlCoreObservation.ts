import { type NictizNlProfile, type Observation } from '../../fhir/index';
import { parse } from '../../parse';
import { map } from '../../utils';
import { type ResourceConfig } from '../config';
import { uiSchema } from './uiSchema';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-observation';

/**
 * NlCoreObservation is reused as the baseDefinition for some other resources.
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317032
 */
export function parseNlCoreObservationBase<T extends NictizNlProfile = typeof profile>(
    resource: Observation,
    profile: T
) {
    return {
        ...parse.resourceMeta(resource, profile),
        identifier: map(resource.identifier, parse.identifier),
        status: parse.code(resource.status),
        category: map(resource.category, parse.codeableConcept),
        subject: parse.reference(resource.subject),
        context: parse.reference(resource.context),
        effectiveDateTime: parse.dateTime(resource.effectiveDateTime),
        effectivePeriod: parse.period(resource.effectivePeriod),
        dataAbsentReason: parse.codeableConcept(resource.dataAbsentReason),
        comment: parse.string(resource.comment),
        bodySite: parse.codeableConcept(resource.bodySite),
    };
}

const parseNlCoreObservation = (resource: Observation) =>
    parseNlCoreObservationBase(resource, profile);

export type NlCoreObservation = ReturnType<typeof parseNlCoreObservation>;

export const nlCoreObservation = {
    profile,
    parse: parseNlCoreObservation,
    uiSchema,
} satisfies ResourceConfig<Observation, NlCoreObservation>;
