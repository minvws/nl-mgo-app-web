import { type HealthUiGroupFunction } from '../../../../../ui/types';
import { type Ingredient } from './ingredient';

export const uiSchemaGroup: HealthUiGroupFunction<Ingredient> = (resource, context) => {
    const profile = 'r4.zib_pharmaceutical_product.ingredient';
    const { ui, formatMessage } = context;

    return {
        label: formatMessage(profile),
        children: [
            ...ui.oneOfValueX(`${profile}.item`, resource, 'item'),
            ...ui.ratio(`${profile}.strength`, resource.strength),
        ],
    };
};
