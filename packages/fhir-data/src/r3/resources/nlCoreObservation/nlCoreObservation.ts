import { type Observation } from 'fhir/r3';
import { type I18nContext } from '../../../i18n';
import { parse } from '../../../parse';
import { FhirVersion } from '../../../types/Fhir';
import { map } from '../../../utils';
import { type ResourceConfigR3 } from '../config';
import { uiSchema } from './uiSchema';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-observation'; // NOSONAR

/**
 * NlCoreObservation is reused as the baseDefinition for some other resources.
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317032
 */
export function parseNlCoreObservationBase(resource: Observation, _i18nContext: I18nContext) {
    return {
        identifier: map(resource.identifier, parse.identifier),
        status: parse.code(resource.status),
        category: map(resource.category, parse.codeableConcept),
        subject: parse.reference(resource.subject),
        context: parse.reference(resource.context),
        valueQuantity: parse.quantity(resource.valueQuantity),
        effectivePeriod: parse.period(resource.effectivePeriod),
        dataAbsentReason: parse.codeableConcept(resource.dataAbsentReason),
        method: parse.codeableConcept(resource.method),
        bodySite: parse.codeableConcept(resource.bodySite),
        effectiveDateTime: parse.dateTime(resource.effectiveDateTime),
        comment: parse.string(resource.comment),
    };
}

export function parseNlCoreObservation(resource: Observation, i18nContext: I18nContext) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        ...parseNlCoreObservationBase(resource, i18nContext),
    };
}

export type NlCoreObservation = ReturnType<typeof parseNlCoreObservation>;

export const nlCoreObservation = {
    profile,
    parse: parseNlCoreObservation,
    uiSchema,
} satisfies ResourceConfigR3<Observation, NlCoreObservation>;
