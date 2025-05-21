import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Observation } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-GeneralMeasurement'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317209
 */
export function parseZibGeneralMeasurementBase(resource: Observation) {
    return {
        // HCIM GeneralMeasurement-v3.0(2017EN)
        ...parseNlCoreObservationBase(resource),
        status: {
            resultStatusCodelist: parse.extension(
                resource._status,
                'http://nictiz.nl/fhir/StructureDefinition/code-specification', // NOSONAR
                'codeableConcept'
            ),
        },
        code: parse.codeableConcept(resource.code),
        related: map(resource.related, (related) => ({
            type: parse.code(related?.type),
            target: parse.reference(related?.target),
        })),
    };
}

function parseZibGeneralMeasurement(resource: Observation) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        ...parseZibGeneralMeasurementBase(resource),
    };
}

export type ZibGeneralMeasurement = ReturnType<typeof parseZibGeneralMeasurement>;

export const zibGeneralMeasurement = {
    profile,
    parse: parseZibGeneralMeasurement,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Observation, ZibGeneralMeasurement>;
