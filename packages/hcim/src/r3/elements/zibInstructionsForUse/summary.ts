import { type HealthUiGroup, type HealthUiGroupFunction } from '@minvws/mgo-hcim-ui';
import { type ZibInstructionsForUse } from './zibInstructionsForUse';

import { SchemaContext } from '../../../api/schemaContext/schemaContext';
import { i18n } from './uiSchemaGroup';

export const summary: HealthUiGroupFunction<ZibInstructionsForUse, HealthUiGroup, SchemaContext> = (
    resource,
    context
) => {
    const { ui, formatMessage } = context;

    return {
        label: formatMessage(`summary.${i18n}`, { sequence: resource.sequence?.value }),
        children: [
            ui.string(`summary.${i18n}.text`, resource.text),
            ...ui.oneOfValueX(`summary.${i18n}.dose`, resource, 'dose'),
        ],
    };
};
