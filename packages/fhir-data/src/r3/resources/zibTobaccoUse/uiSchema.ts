import { type HealthUiSchemaFunction } from '../../../ui';
import { nlCoreObservation } from '../nlCoreObservation/nlCoreObservation';
import { type ZibTobaccoUse } from './zibTobaccoUse';

export const uiSchema: HealthUiSchemaFunction<ZibTobaccoUse> = (resource, context) => {
    return nlCoreObservation.uiSchema(resource, context);
};
