import { type UiSchemaFunction } from '../../../ui';
import { nlCoreObservation } from '../nlCoreObservation/nlCoreObservation';
import { type ZibTobaccoUse } from './zibTobaccoUse';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
export const uiSchema: UiSchemaFunction<ZibTobaccoUse> = (resource, context) => {
    return nlCoreObservation.uiSchema(resource, context);
};
