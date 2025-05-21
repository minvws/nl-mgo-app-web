import { type HealthUiGroup, type HealthUiGroupFunction } from '../../../ui/types';
import { type ZibInstructionsForUse } from './zibInstructionsForUse';

import { i18n } from './uiSchemaGroup';

export const summary: HealthUiGroupFunction<ZibInstructionsForUse, HealthUiGroup> = (
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
