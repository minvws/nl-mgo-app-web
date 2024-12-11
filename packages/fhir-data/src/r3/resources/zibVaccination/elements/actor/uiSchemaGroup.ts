import { type NonStrictUi, type UiSchemaGroupFunction } from '../../../../../ui/types';
import { type Actor } from './actor';

export const uiSchemaGroup: UiSchemaGroupFunction<Actor> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    return {
        label: 'Immunization.practitioner.actor',
        children: [ui.reference(`Immunization.practitioner.actor`, resource.actor)],
    };
};
