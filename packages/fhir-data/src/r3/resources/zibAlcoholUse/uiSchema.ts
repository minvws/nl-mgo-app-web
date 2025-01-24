import { type UiSchemaFunction } from '../../../ui';
import { nlCoreObservation } from '../nlCoreObservation/nlCoreObservation';
import { type ZibAlcoholUse } from '../zibAlcoholUse/zibAlcoholUse';

export const uiSchema: UiSchemaFunction<ZibAlcoholUse> = (resource, context) => {
    return nlCoreObservation.uiSchema(resource, context);
};
