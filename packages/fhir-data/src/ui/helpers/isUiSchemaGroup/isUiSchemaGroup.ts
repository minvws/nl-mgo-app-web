import { type HealthUiGroup, type HealthUiSchema, type UiElement } from '../../types';

export function isUiSchemaGroup(
    schema: UiElement | HealthUiSchema | HealthUiGroup
): schema is HealthUiGroup {
    return (schema as HealthUiGroup).children?.some((x) => typeof x.type === 'string');
}
