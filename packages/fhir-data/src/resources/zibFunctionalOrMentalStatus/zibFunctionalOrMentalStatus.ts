import { type Observation } from '../../fhir/index';
import { type ResourceConfig } from '../config';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-FunctionalOrMentalStatus';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317206
 */
function parseZibFunctionalOrMentalStatus(resource: Observation) {
    const { effectiveDateTime: _, ...rest } = parseNlCoreObservationBase(resource, profile);
    return rest;
}

export type ZibFunctionalOrMentalStatus = ReturnType<typeof parseZibFunctionalOrMentalStatus>;

export const zibFunctionalOrMentalStatus = {
    profile,
    parse: parseZibFunctionalOrMentalStatus,
    uiSchema,
} satisfies ResourceConfig<Observation, ZibFunctionalOrMentalStatus>;
