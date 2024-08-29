import { type Lossless } from '../../types/Lossless';
import { type UiSchema } from '../../ui';
import { resourcesMap, type MgoResource, type ResourceTypeConfig } from '../resources/resources';

export type ResourceConfig<T extends MgoResource> = Extract<
    ResourceTypeConfig,
    { uiSchema: (arg: Lossless<T>) => UiSchema }
>;

function getResourceConfig<T extends MgoResource>(resource: Lossless<T>) {
    const config = resourcesMap[resource.profile];

    if (!config) {
        throw new Error(`No config found for MGO Resource with profile: "${resource.profile}"`);
    }

    return config as ResourceConfig<T>;
}

export function getUiSchema<T extends MgoResource>(resource: Lossless<T>) {
    const config = getResourceConfig(resource);
    return config.uiSchema(resource);
}
