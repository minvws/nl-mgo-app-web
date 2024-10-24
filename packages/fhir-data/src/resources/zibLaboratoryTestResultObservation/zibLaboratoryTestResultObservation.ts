import { type Observation } from 'fhir/r3';
import { parse } from '../../parse';
import { type ResourceConfig } from '../config';
import { uiSchema } from './uiSchema';
import { map } from '../../utils';
import { related } from './elements/related/related';
import { referenceRange } from './elements/referenceRange/referenceRange';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-LaboratoryTestResult-Observation';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317239
 */
function parseZibLaboratoryTestResultObservation(resource: Observation) {
    return {
        ...parse.resourceMeta(resource, profile),
        identifier: map(resource.identifier, parse.identifier),
        subject: parse.reference(resource.subject),
        code: parse.codeableConcept(resource?.code),
        method: parse.codeableConcept(resource?.method),
        effective:
            parse.dateTime(resource?.effectiveDateTime) ?? parse.period(resource?.effectivePeriod),
        result: parse.quantity(resource?.valueQuantity),
        status: parse.string(resource?.status),
        referenceRange: map(resource?.referenceRange, referenceRange.parse),
        interpretation: parse.codeableConcept(resource?.interpretation),
        specimen: parse.reference(resource.specimen),
        comment: parse.string(resource.comment),
        category: map(resource.category, parse.codeableConcept),
        related: map(resource.related, related.parse),
        basedOn: map(resource.basedOn, parse.reference),
    };
}

export type ZibLaboratoryTestResultObservation = ReturnType<
    typeof parseZibLaboratoryTestResultObservation
>;

export const zibLaboratoryTestResultObservation = {
    profile,
    parse: parseZibLaboratoryTestResultObservation,
    uiSchema,
} satisfies ResourceConfig<Observation, ZibLaboratoryTestResultObservation>;
