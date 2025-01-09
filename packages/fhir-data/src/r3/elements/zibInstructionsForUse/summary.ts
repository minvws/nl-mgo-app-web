import { type UiSchemaGroup, type UiSchemaGroupFunction } from '../../../ui/types';
import { type ZibInstructionsForUse } from './zibInstructionsForUse';

import { i18n } from './uiSchemaGroup';

export const summary: UiSchemaGroupFunction<ZibInstructionsForUse, UiSchemaGroup> = (
    resource,
    context
) => {
    const { ui, formatMessage } = context;

    return {
        label: formatMessage(`summary.${i18n}`, { sequence: resource.sequence }),
        children: [
            ui.string(`summary.${i18n}.text`, resource.text),
            ...ui.oneOfValueX(`summary.${i18n}.dose`, resource, 'dose'),
        ],
    };
};
