import { type HealthUiGroup, type HealthUiSchema } from '../../types';

export function isUiSchemaGroup(schema: HealthUiSchema | HealthUiGroup): schema is HealthUiGroup {
    return (schema as HealthUiGroup).children?.some((x) => typeof x.type === 'string');
}
