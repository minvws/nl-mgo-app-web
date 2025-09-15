import { FhirVersion } from '@minvws/mgo-fhir';
import { type HealthUiSchemaFunction } from '@minvws/mgo-hcim-ui';
import { capitalize } from 'lodash-es';
import { SchemaContext } from '../../../api/schemaContext/schemaContext.js';
import { zibLaboratoryTestResultObservation } from '../zibLaboratoryTestResultObservation/zibLaboratoryTestResultObservation.js';
import { type GpLaboratoryResult } from './gpLaboratoryResult.js';

export const i18n = 'r3.gp_laboratory_result';

export const summary: HealthUiSchemaFunction<GpLaboratoryResult, SchemaContext<FhirVersion.R3>> = (
    resource,
    context
) => {
    const { formatMessage } = context;
    return {
        ...zibLaboratoryTestResultObservation.summary(resource, context),
        label: capitalize(resource.context?.display) || formatMessage(i18n),
    };
};
