import { type HealthUiGroupFunction, type NonStrictUi } from '../../../../../ui/types';
import { map } from '../../../../../utils';
import { type Section } from './section';

export const uiSchemaGroup: HealthUiGroupFunction<Section> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const profile = 'EncounterReport.Section';

    return {
        label: profile,
        children: [
            ui.codeableConcept(`${profile}.code`, resource.code),
            ...map(resource.entry, (entry) => ui.reference(`${profile}.entry`, entry), true),
        ],
    };
};
