import { type LosslessJson } from './client/json/json';
import { type FhirResource, type ResourceType } from './types';

export { createClient } from './client/client';
export { parseJson, type LosslessJson } from './client/json/json';

export type { ResourceRequest, ResourceResponse } from './client/getResource/getResource';
export type { ResourcesRequest, ResourcesResponse } from './client/getResources/getResources';

export type LosslessFhirResource<
    T extends ResourceType,
    Resource = Extract<FhirResource, { resourceType: T }>,
> = LosslessJson<Resource>;
