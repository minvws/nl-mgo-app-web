import { FhirVersion, type FhirResource } from '@minvws/mgo-fhir-types';
import { isFhirResource } from '../../utils';
import { getResourceConfig } from '../getResourceConfig/getResourceConfig';
import { type MgoResource } from '../resources/resources';

export type Options<V extends FhirVersion> = {
    fhirVersion: V;
};

const defaultOptions: Options<FhirVersion.R3> = {
    fhirVersion: FhirVersion.R3,
};

export function getMgoResource<T extends FhirResource<V>, V extends FhirVersion>(
    resource: T,
    options: Partial<Options<V>> = {}
): MgoResource<V> | undefined {
    const { fhirVersion } = { ...defaultOptions, ...options };

    // As this method is also used with JSON parsed inputs,
    // we want to ensure we're really dealing with a Fhir Resource.
    if (!isFhirResource(resource)) {
        throw new Error(
            `input does not seem to be a valid Fhir Resource. Received resourceType: "${(resource as FhirResource)?.resourceType}"`
        );
    }

    const config = getResourceConfig(resource.meta?.profile ?? [], fhirVersion);

    if (!config) {
        console.error(
            `No config found for fhir resourceType: "${resource.resourceType}" with profile: "${resource.meta?.profile}" for fhir version: "${fhirVersion}"`
        );
        return;
    }

    return config.parse(resource) as MgoResource<V>;
}
