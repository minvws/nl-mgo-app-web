import { type Observation } from '../../fhir/index';
import { type ResourceConfig } from '../config';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-BodyHeight';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317149
 */
function parseZibBodyHeight(resource: Observation) {
    return parseNlCoreObservationBase(resource, profile);
}

export type ZibBodyHeight = ReturnType<typeof parseZibBodyHeight>;

export const zibBodyHeight = {
    profile,
    parse: parseZibBodyHeight,
    uiSchema,
} satisfies ResourceConfig<Observation, ZibBodyHeight>;
