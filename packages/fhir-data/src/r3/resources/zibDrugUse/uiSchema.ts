import { type HealthUiSchemaFunction } from '../../../ui';
import { nlCoreObservation } from '../nlCoreObservation/nlCoreObservation';
import { type ZibDrugUse } from './zibDrugUse';

export const uiSchema: HealthUiSchemaFunction<ZibDrugUse> = (resource, context) => {
    return nlCoreObservation.uiSchema(resource, context);
};
