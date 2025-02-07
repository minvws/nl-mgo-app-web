import { type HealthUiSchemaFunction } from '../../../ui';
import { zibLaboratoryTestResultObservation } from '../zibLaboratoryTestResultObservation/zibLaboratoryTestResultObservation';
import { type GpLaboratoryResult } from './gpLaboratoryResult';
import { getLabel } from './uiSchema';

export const summary: HealthUiSchemaFunction<GpLaboratoryResult> = (resource, context) => {
    return {
        ...zibLaboratoryTestResultObservation.summary(resource, context),
        label: getLabel(resource, context),
    };
};
