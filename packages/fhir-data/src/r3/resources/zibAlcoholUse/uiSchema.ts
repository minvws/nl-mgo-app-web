import { type HealthUiSchemaFunction } from '../../../ui';
import { nlCoreObservation } from '../nlCoreObservation/nlCoreObservation';
import { type ZibAlcoholUse } from '../zibAlcoholUse/zibAlcoholUse';

export const uiSchema: HealthUiSchemaFunction<ZibAlcoholUse> = (resource, context) => {
    return nlCoreObservation.uiSchema(resource, context);
};
