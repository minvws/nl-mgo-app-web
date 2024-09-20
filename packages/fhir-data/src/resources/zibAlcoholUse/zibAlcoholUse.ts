import { type Observation } from '../../fhir/index';
import { type ResourceConfig } from '../config';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-AlcoholUse';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317134
 */
function parseZibAlcoholUse(resource: Observation) {
    const { effectiveDateTime: _, ...rest } = parseNlCoreObservationBase(resource, profile);
    return rest;
}

export type ZibAlcoholUse = ReturnType<typeof parseZibAlcoholUse>;

export const zibAlcoholUse = {
    profile,
    parse: parseZibAlcoholUse,
    uiSchema,
} satisfies ResourceConfig<Observation, ZibAlcoholUse>;
