import { type HealthUiSchemaContext } from '../../context';
import { type UiElement } from '../../types';

export function organization({ formatMessage, organization }: HealthUiSchemaContext): UiElement {
    return {
        type: 'SINGLE_VALUE',
        label: formatMessage(`summary.organization`),
        display: organization?.name,
    };
}
