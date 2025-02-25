import { type HealthUiGroupFunction } from '../../../../../ui/types';
import { type Batch } from './batch';

export const uiSchemaGroup: HealthUiGroupFunction<Batch> = (resource, context) => {
    const profile = 'r4.zib_pharmaceutical_product.batch';
    const { ui, formatMessage } = context;

    return {
        label: formatMessage(profile),
        children: [
            ui.string(`${profile}.lot_number`, resource.lotNumber),
            ui.dateTime(`${profile}.expiration_date`, resource.expirationDate),
        ],
    };
};
