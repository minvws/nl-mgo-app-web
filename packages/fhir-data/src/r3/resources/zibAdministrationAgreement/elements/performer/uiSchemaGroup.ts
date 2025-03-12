import { type HealthUiGroupFunction } from '../../../../../ui/types';
import { type Performer } from './performer';

export const performerGroup: HealthUiGroupFunction<Performer> = (resource, context) => {
    const { formatMessage } = context;
    const profile = 'r3.zib_administration_agreement.performer';

    return {
        label: formatMessage(profile),
        children: [
            context.ui.reference(`${profile}.actor`, resource.actor),
            context.ui.reference(`${profile}.on_behalf_of`, resource.onBehalfOf),
        ],
    };
};
