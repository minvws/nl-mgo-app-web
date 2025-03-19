import { type HealthUiSchemaFunction } from '../../../ui';
import { organization } from '../../../ui/common/organization/organization';
import { summaryOptions } from '../../../ui/common/summaryOptions/summaryOptions';
import { map } from '../../../utils';
import { type R4NlCoreVaccinationEvent } from './nlCoreVaccinationEvent';
import { getLabel, i18n } from './uiSchema';

export const summary: HealthUiSchemaFunction<R4NlCoreVaccinationEvent> = (resource, context) => {
    const { ui, formatMessage } = context;

    return {
        label: getLabel(resource, context),
        children: [
            {
                children: [
                    ui.dateTime(`${i18n}.occurrence_date_time`, resource.occurrenceDateTime),
                    ui.annotation(`${i18n}.note`, resource.note),
                ],
            },
            {
                label: formatMessage(`summary.${i18n}.group_performer`),
                children: [
                    ...map(resource.performer, (x) => ui.reference(`${i18n}.performer`, x), true),
                    organization(context),
                ],
            },
            summaryOptions(context, i18n, resource),
        ],
    };
};
