import { type UiSchema, type UiSchemaGroup } from '../../types';

export function isUiSchemaGroup(schema: UiSchema | UiSchemaGroup): schema is UiSchemaGroup {
    return (schema as UiSchemaGroup).children?.some((x) => typeof x.type === 'string');
}
