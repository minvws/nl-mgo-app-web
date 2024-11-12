import { type Observation } from 'fhir/r3';
import { FhirVersion } from '../../../types/Fhir';
import { parse } from '../../../parse';
import { map } from '../../../utils';
import { type ResourceConfigR3 } from '../config';
import { referenceRange } from '../zibLaboratoryTestResultObservation/elements/referenceRange/referenceRange';
import { related } from '../zibLaboratoryTestResultObservation/elements/related/related';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/gp-LaboratoryResult'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316997
 */

function parseGpLaboratoryResult(resource: Observation) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
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

export type GpLaboratoryResult = ReturnType<typeof parseGpLaboratoryResult>;

export const gpLaboratoryResult = {
    profile,
    parse: parseGpLaboratoryResult,
    uiSchema,
} satisfies ResourceConfigR3<Observation, GpLaboratoryResult>;
