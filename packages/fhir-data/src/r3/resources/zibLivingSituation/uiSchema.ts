import { type HealthUiSchemaFunction } from '../../../ui/types';
import { nlCoreObservation } from '../nlCoreObservation/nlCoreObservation';
import { type ZibLivingSituation } from './zibLivingSituation';

export const uiSchema: HealthUiSchemaFunction<ZibLivingSituation> = (resource, context) => {
    return nlCoreObservation.uiSchema(resource, context);
};
