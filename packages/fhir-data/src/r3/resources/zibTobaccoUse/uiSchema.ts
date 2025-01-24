import { type UiSchemaFunction } from '../../../ui';
import { nlCoreObservation } from '../nlCoreObservation/nlCoreObservation';
import { type ZibTobaccoUse } from './zibTobaccoUse';

export const uiSchema: UiSchemaFunction<ZibTobaccoUse> = (resource, context) => {
    return nlCoreObservation.uiSchema(resource, context);
};
