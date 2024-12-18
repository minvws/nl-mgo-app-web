import { type NonStrictUi, type UiSchemaGroupFunction } from '../../../../../ui/types';
import { type Actor } from './actor';

export const uiSchemaGroup: UiSchemaGroupFunction<Actor> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    return {
        label: 'r3.immunization.practitioner.actor',
        children: [ui.reference(`r3.immunization.practitioner.actor`, resource.actor)],
    };
};
