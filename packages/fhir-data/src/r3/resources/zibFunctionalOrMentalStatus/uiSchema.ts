import { type UiSchema } from '../../../ui';
import { nlCoreObservation } from '../nlCoreObservation/nlCoreObservation';
import { type ZibFunctionalOrMentalStatus } from './zibFunctionalOrMentalStatus';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
export function uiSchema(resource: ZibFunctionalOrMentalStatus): UiSchema {
    return nlCoreObservation.uiSchema(resource);
}
