import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Observation } from 'fhir/r3';
import { type ResourceConfig } from '../../../types';

import { parse } from '../../../parse';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-TobaccoUse'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317376
 */
function parseZibTobaccoUse(resource: Observation) {
    const { effectiveDateTime: _, ...rest } = parseNlCoreObservationBase(resource);
    return {
        ...rest,
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
    };
}

export type ZibTobaccoUse = ReturnType<typeof parseZibTobaccoUse>;

export const zibTobaccoUse = {
    profile,
    parse: parseZibTobaccoUse,
    uiSchema,
} satisfies ResourceConfig<Observation, ZibTobaccoUse>;
