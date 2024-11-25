import { type Observation } from 'fhir/r3';
import { FhirVersion } from '../../../types/Fhir';
import { parse } from '../../../parse';
import { type ResourceConfigR3 } from '../config';
import { uiSchema } from './uiSchema';
import { map } from '../../../utils';
import { related } from './elements/related/related';
import { referenceRange } from './elements/referenceRange/referenceRange';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-LaboratoryTestResult-Observation'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317239
 */
function parseZibLaboratoryTestResultObservation(resource: Observation) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        identifier: map(resource.identifier, parse.identifier),
        subject: parse.reference(resource.subject),
        code: parse.codeableConcept(resource?.code), // NL-CM:13.1.8
        method: parse.codeableConcept(resource?.method), // NL-CM:13.1.9
        effective:
            parse.dateTime(resource?.effectiveDateTime) ?? parse.period(resource?.effectivePeriod), // NL-CM:13.1.13
        result: parse.quantity(resource?.valueQuantity), // NL-CM:13.1.10
        status: parse.string(resource?.status), // NL-CM:13.1.31
        referenceRange: map(resource?.referenceRange, referenceRange.parse), // NL-CM:13.1.11 & NL-CM:13.1.12
        interpretation: parse.codeableConcept(resource?.interpretation), // NL-CM:13.1.14
        specimen: parse.reference(resource.specimen), // NL-CM:13.1.2
        comment: parse.string(resource.comment), // NL-CM:13.1.5
        category: map(resource.category, parse.codeableConcept), // NL-CM:13.1.7
        related: map(resource.related, related.parse), // NL-CM:13.1.33 or NL-CM:13.1.3
        basedOn: map(resource.basedOn, parse.reference), // NL-CM:13.1.34
    };
}

export type ZibLaboratoryTestResultObservation = ReturnType<
    typeof parseZibLaboratoryTestResultObservation
>;

export const zibLaboratoryTestResultObservation = {
    profile,
    parse: parseZibLaboratoryTestResultObservation,
    uiSchema,
} satisfies ResourceConfigR3<Observation, ZibLaboratoryTestResultObservation>;
