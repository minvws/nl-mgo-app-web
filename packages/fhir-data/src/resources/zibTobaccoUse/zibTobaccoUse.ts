import { type Observation } from '../../fhir/index';
import { type ResourceConfig } from '../config';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-TobaccoUse';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317376
 */
function parseZibTobaccoUse(resource: Observation) {
    const { effectiveDateTime: _, ...rest } = parseNlCoreObservationBase(resource, profile);
    return rest;
}

export type ZibTobaccoUse = ReturnType<typeof parseZibTobaccoUse>;

export const zibTobaccoUse = {
    profile,
    parse: parseZibTobaccoUse,
    uiSchema,
} satisfies ResourceConfig<Observation, ZibTobaccoUse>;
