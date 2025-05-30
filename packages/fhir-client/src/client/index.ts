import { FhirVersion } from '@minvws/mgo-fhir-types';
import { losslessParse } from '@minvws/mgo-mgo-utils';
import ky, { type Options as KyOptions } from 'ky';
import type { SetRequired } from 'type-fest';
import { setupResource } from './resource/resource';
import { setupResources } from './resources/resources';

export interface FhirClientOptions<V extends FhirVersion = FhirVersion>
    extends SetRequired<KyOptions, 'prefixUrl'> {
    fhirVersion: V;
}

const defaultHeaders: Record<FhirVersion, Record<string, string>> = {
    [FhirVersion.R3]: {
        Accept: 'application/fhir+json; fhirVersion=3.0',
    },
    [FhirVersion.R4]: {
        Accept: 'application/fhir+json; fhirVersion=4.0',
    },
};

export function createClient<V extends FhirVersion>({
    parseJson = losslessParse,
    headers = {},
    fhirVersion,
    ...rest
}: FhirClientOptions<V>) {
    const options: FhirClientOptions<V> = {
        fhirVersion,
        parseJson,
        headers: {
            ...defaultHeaders[fhirVersion],
            ...headers,
        },
        ...rest,
    };

    const instance = ky.create(options);

    return {
        fhirVersion,
        instance,
        ...setupResource(instance, options),
        ...setupResources(instance, options),
    };
}

export type FhirClient<V extends FhirVersion = FhirVersion> = ReturnType<typeof createClient<V>>;
