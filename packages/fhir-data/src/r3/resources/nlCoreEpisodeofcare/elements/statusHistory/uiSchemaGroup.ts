import { type HealthUiGroupFunction, type NonStrictUi } from '../../../../../ui/types';
import { type StatusHistory } from './statusHistory';

export const uiSchemaGroup: HealthUiGroupFunction<StatusHistory> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const profile = 'r3.nl_core_episodeofcare.status_history';

    return {
        label: profile,
        children: [
            ui.code(`${profile}.status`, resource.status),
            ...ui.period(`${profile}.period`, resource.period),
        ],
    };
};
