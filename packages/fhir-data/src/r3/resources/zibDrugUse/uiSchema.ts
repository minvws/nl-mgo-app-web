import { type UiSchemaFunction } from '../../../ui';
import { nlCoreObservation } from '../nlCoreObservation/nlCoreObservation';
import { type ZibDrugUse } from './zibDrugUse';

export const uiSchema: UiSchemaFunction<ZibDrugUse> = (resource, context) => {
    return nlCoreObservation.uiSchema(resource, context);
};
