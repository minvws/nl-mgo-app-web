import * as resources from '../../resources';
import { type ResourceConfig } from '../../resources/config';

type AnyResourceConfig = ResourceConfig<any, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

// Ensures only resource configs are listed
resources satisfies Record<string, AnyResourceConfig>;

export const resourcesMap = Object.fromEntries(
    Object.entries(resources).map(([_name, config]) => [config.profile, config])
);

type ResourcesMap = typeof resourcesMap;

export type ResourceTypeConfig = ResourcesMap[keyof ResourcesMap];
export type MgoResource = ReturnType<ResourceTypeConfig['parse']>;
