import { UiContext } from '../../context/index.js';
import { type UiElement } from '../../types/index.js';

export function organization(
    { formatMessage }: UiContext,
    organization: { name?: string } | undefined
): UiElement {
    return {
        type: 'SINGLE_VALUE',
        label: formatMessage(`summary.organization`),
        display: organization?.name,
    };
}
