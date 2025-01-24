import { type UiSchemaFunction } from '../../../ui/types';
import { nlCoreObservation } from '../nlCoreObservation/nlCoreObservation';
import { type ZibLivingSituation } from './zibLivingSituation';

export const uiSchema: UiSchemaFunction<ZibLivingSituation> = (resource, context) => {
    return nlCoreObservation.uiSchema(resource, context);
};
