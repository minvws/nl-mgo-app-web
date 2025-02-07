import { type HealthUiGroupFunction } from '../../../../../ui/types';
import { type Performer } from './performer';

export const uiSchemaGroup: HealthUiGroupFunction<Performer> = (resource, context) => {
    const ui = context.ui;
    return {
        label: 'zib_procedure.performer',
        children: [ui.reference(`r3.zib_procedure.performer`, resource.actor)],
    };
};
