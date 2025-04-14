import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Observation } from 'fhir/r3';
import { parse } from '../../../parse';
import { filterCodeableConceptByCoding, oneOfValueX } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../types';
import { map } from '../../../utils';
import { SNOMED_SYSTEM, Snomed, SnomedResultTypes } from '../../valueSets/snomed';
import { referenceRange } from './elements/referenceRange/referenceRange';
import { related } from './elements/related/related';
import { summary } from './summary';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-LaboratoryTestResult-Observation'; // NOSONAR

/**
 * ZibLaboratoryResultObservation is reused as the baseDefinition for some other resources.
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317239
 */
export function parseZibLaboratoryTestResultObservationBase(resource: Observation) {
    const laboratoryTestResultCode = filterCodeableConceptByCoding(
        resource.category,
        (x) => x.system === SNOMED_SYSTEM && x.code === Snomed.LABORATORY_TEST_FINDING
    );

    const resultType = filterCodeableConceptByCoding(
        resource.category,
        (x) => x.system === SNOMED_SYSTEM && SnomedResultTypes.includes(x.code as Snomed)
    );

    return {
        identifier: map(resource.identifier, parse.identifier),
        subject: parse.reference(resource.subject),
        context: parse.reference(resource.context),
        code: parse.codeableConcept(resource?.code),
        method: parse.codeableConcept(resource?.method),
        ...oneOfValueX(resource, ['dateTime', 'period'], 'effective'),
        ...oneOfValueX(resource, [
            'quantity',
            'codeableConcept',
            'string',
            'boolean',
            'range',
            'ratio',
            'dateTime',
            'period',
        ]),
        status: parse.code(resource?.status),
        referenceRange: map(resource?.referenceRange, referenceRange.parse),
        interpretation: parse.codeableConcept(resource?.interpretation),
        specimen: parse.reference(resource.specimen),
        comment: parse.string(resource.comment),
        laboratoryTestResultCode: map(laboratoryTestResultCode, parse.codeableConcept),
        resultType: map(resultType, parse.codeableConcept),
        related: map(resource.related, related.parse),
        basedOn: map(resource.basedOn, parse.reference),
        performer: map(resource.performer, parse.reference),
    };
}

export function parseZibLaboratoryTestResultObservation(resource: Observation) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        ...parseZibLaboratoryTestResultObservationBase(resource),
    };
}

export type ZibLaboratoryTestResultObservation = ReturnType<
    typeof parseZibLaboratoryTestResultObservation
>;

export const zibLaboratoryTestResultObservation = {
    profile,
    parse: parseZibLaboratoryTestResultObservation,
    uiSchema,
    summary,
} satisfies ResourceConfig<Observation, ZibLaboratoryTestResultObservation>;
