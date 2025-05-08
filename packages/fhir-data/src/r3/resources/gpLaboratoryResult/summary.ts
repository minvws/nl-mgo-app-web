import { capitalize } from 'lodash';
import { type HealthUiSchemaFunction } from '../../../ui';
import { zibLaboratoryTestResultObservation } from '../zibLaboratoryTestResultObservation/zibLaboratoryTestResultObservation';
import { type GpLaboratoryResult } from './gpLaboratoryResult';

export const i18n = 'r3.gp_laboratory_result';

export const summary: HealthUiSchemaFunction<GpLaboratoryResult> = (resource, context) => {
    const { formatMessage } = context;
    return {
        ...zibLaboratoryTestResultObservation.summary(resource, context),
        label: capitalize(resource.context?.display) || formatMessage(i18n),
    };
};
