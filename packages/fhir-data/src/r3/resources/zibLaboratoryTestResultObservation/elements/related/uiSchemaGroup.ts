import { type UiSchemaGroupFunction } from '../../../../../ui/types';
import { type Related } from './related';

export const uiSchemaGroup: UiSchemaGroupFunction<Related> = (resource, context) => {
    const { ui, formatMessage } = context;
    return {
        label: formatMessage('r3.zib_laboratory_test_result_observation.related'),
        children: [
            ui.reference(`r3.zib_laboratory_test_result_observation.related`, resource.target),
        ],
    };
};
