import { capitalize } from 'lodash';
import { type HealthUiSchemaFunction } from '../../../ui';
import { type UiHelperContext } from '../../../ui/context/ui';
import { zibLaboratoryTestResultObservation } from '../zibLaboratoryTestResultObservation/zibLaboratoryTestResultObservation';
import { type GpLaboratoryResult } from './gpLaboratoryResult';

export const i18n = 'r3.gp_laboratory_result';

export function getLabel(resource: GpLaboratoryResult, { formatMessage }: UiHelperContext) {
    return capitalize(resource.context?.display) || formatMessage(i18n);
}

export const uiSchema: HealthUiSchemaFunction<GpLaboratoryResult> = (resource, context) => {
    return {
        ...zibLaboratoryTestResultObservation.uiSchema(resource, context),
        label: getLabel(resource, context),
    };
};
