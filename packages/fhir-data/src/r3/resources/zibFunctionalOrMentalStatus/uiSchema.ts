import { type UiSchemaFunction } from '../../../ui';
import { nlCoreObservation } from '../nlCoreObservation/nlCoreObservation';
import { type ZibFunctionalOrMentalStatus } from './zibFunctionalOrMentalStatus';

export const uiSchema: UiSchemaFunction<ZibFunctionalOrMentalStatus> = (resource, context) => {
    return nlCoreObservation.uiSchema(resource, context);
};
