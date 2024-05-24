import type { FhirResource, ResourceType } from '../types';
import { type LosslessJson } from './json/json';
import { type ResourceRequest, type ResourceResponse } from './getResource/getResource';
import { type ResourcesRequest, type ResourcesResponse } from './getResources/getResources';

export { createClient } from './createClient/createClient';

export type {
    ResourceRequest,
    ResourceResponse,
    ResourcesRequest,
    ResourcesResponse,
    LosslessJson,
};

export type LosslessFhirResource<
    T extends ResourceType,
    Resource = Extract<FhirResource, { resourceType: T }>,
> = LosslessJson<Resource>;
