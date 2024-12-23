import { type Observation } from 'fhir/r3';
import { type I18nContext } from '../../../i18n';
import { FhirVersion } from '../../../types/Fhir';
import { parse } from '../../../parse';
import { type ResourceConfigR3 } from '../config';
import { uiSchema } from './uiSchema';
import { map } from '../../../utils';
import { related } from './elements/related/related';
import { referenceRange } from './elements/referenceRange/referenceRange';
import { filterCodeableConceptByCoding, oneOfValueX } from '../../../parse/helpers';
import { Snomed, SNOMED_SYSTEM, SnomedResultTypes } from '../../../valueSets/snomed';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-LaboratoryTestResult-Observation'; // NOSONAR

/**
 * ZibLaboratoryResultObservation is reused as the baseDefinition for some other resources.
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317239
 */
export function parseZibLaboratoryTestResultObservationBase(
    resource: Observation,
    _i18nContext: I18nContext
) {
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
        status: parse.string(resource?.status),
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

export function parseZibLaboratoryTestResultObservation(
    resource: Observation,
    i18nContext: I18nContext
) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        ...parseZibLaboratoryTestResultObservationBase(resource, i18nContext),
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
