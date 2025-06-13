import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Observation } from 'fhir/r3';
import { parse } from '../../../parse';
import { filterCodeableConcept, filterCoding, oneOfValueX } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../resourceTypes';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';
import { interpretatieVlaggenCodelijstValueSet } from '../../valueSets/interpretatieVlaggenCodelijst';
import { resultTypeCodelist } from '../../valueSets/resultTypeCodelist';
import { Snomed, SNOMED_SYSTEM } from '../../valueSets/snomed';
import { summary } from './summary';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-LaboratoryTestResult-Observation'; // NOSONAR

/**
 * ZibLaboratoryResultObservation is reused as the baseDefinition for some other resources.
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317239
 */
export function parseZibLaboratoryTestResultObservationBase(resource: Observation) {
    return {
        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        subject: parse.reference(resource.subject),
        ...oneOfValueX(resource, ['dateTime', 'period'], 'effective'),
        performer: map(resource.performer, parse.reference),

        // HCIM LaboratoryTestResult-v4.1(2017EN)
        basedOn: map(resource.basedOn, parse.reference),
        status: {
            ...parse.code(resource?.status),
            testResultStatus: parse.extension(
                resource._status,
                'http://nictiz.nl/fhir/StructureDefinition/code-specification', // NOSONAR
                'codeableConcept'
            ),
        },
        category: {
            laboratoryTestResultCode: parse.codeableConcept(
                filterCodeableConcept(resource.category, {
                    system: SNOMED_SYSTEM,
                    code: Snomed.LABORATORY_TEST_FINDING,
                })
            ),
            resultType: parse.codeableConcept(
                filterCodeableConcept(resource.category, resultTypeCodelist)?.[0]
            ),
        },
        code: parse.codeableConcept(resource?.code),
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
        interpretation: {
            interpretatieVlaggenCodelijst: map(
                filterCoding(
                    resource.interpretation?.coding,
                    interpretatieVlaggenCodelijstValueSet
                ),
                parse.coding
            ),
        },
        comment: parse.string(resource.comment),
        context: parse.reference(resource.context),
        method: parse.codeableConcept(resource?.method),
        specimen: parse.reference(resource.specimen),
        referenceRange: map(resource?.referenceRange, (referenceRange) => ({
            low: parse.quantity(referenceRange?.low),
            high: parse.quantity(referenceRange?.high),
            type: parse.codeableConcept(referenceRange?.type),
        })),
        related: map(resource.related, (related) => ({
            target: parse.reference(related?.target),
        })),
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
    uiSchema: generateUiSchema,
    summary,
} satisfies ResourceConfig<Observation, ZibLaboratoryTestResultObservation>;
