import { type HealthUiSchemaFunction } from '../../../ui';
import { nlCoreObservation } from '../nlCoreObservation/nlCoreObservation';
import { type ZibFunctionalOrMentalStatus } from './zibFunctionalOrMentalStatus';

export const uiSchema: HealthUiSchemaFunction<ZibFunctionalOrMentalStatus> = (
    resource,
    context
) => {
    return nlCoreObservation.uiSchema(resource, context);
};
