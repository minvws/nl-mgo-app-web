import { UiContext } from '../../context/index';
import { type UiElement } from '../../types';

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
