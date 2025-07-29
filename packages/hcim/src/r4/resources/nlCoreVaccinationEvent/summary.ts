import { common } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { capitalize } from 'lodash-es';
import { SummarySchemaFunction } from '../../../resourceTypes.js';
import { type R4NlCoreVaccinationEvent } from './nlCoreVaccinationEvent.js';

export const i18n = 'r4.nl_core_vaccination_event';

export const summary: SummarySchemaFunction<R4NlCoreVaccinationEvent> = (resource, context) => {
    const { ui, formatMessage } = context;

    return {
        label:
            capitalize(resource.vaccineCode?.coding?.at(0)?.display) || context.formatMessage(i18n),
        children: [
            {
                children: [
                    ui.dateTime(`${i18n}.occurrence_date_time`, resource.occurrenceDateTime),
                    ui.annotation(`${i18n}.note.text`, resource.note),
                ],
            },
            {
                label: formatMessage(`summary.${i18n}.group_performer`),
                children: [
                    ...map(
                        resource.performer,
                        (x) =>
                            ui.reference(
                                `${i18n}.performer.administrator.actor`,
                                x.administrator.actor
                            ),
                        true
                    ),
                    common.organization(context, context.organization),
                ],
            },
            common.summaryOptions(context, i18n, resource),
        ],
    };
};
