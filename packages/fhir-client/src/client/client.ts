import ky, { type KyInstance, type Options as KyOptions } from 'ky';
import type { FhirClientOptions } from '../types';
import { getResource } from './getResource/getResource';
import { getResources } from './getResources/getResources';
import { parseJson } from './json/json';

function partial<Request, Response>(
    func: (
        instance: KyInstance,
        fhirOptions: FhirClientOptions,
        request: Request,
        options?: KyOptions
    ) => Response,
    instance: KyInstance,
    fhirOptions: FhirClientOptions
) {
    return (request: Request, options?: KyOptions) => func(instance, fhirOptions, request, options);
}

export function createClient(kyOptions: KyOptions = {}, fhirClientOptions: FhirClientOptions = {}) {
    if (!kyOptions.parseJson) {
        kyOptions.parseJson = parseJson;
    }

    const instance = ky.create(kyOptions);

    fhirClientOptions.defaultQueryParams = {
        _format: 'json',
        ...fhirClientOptions.defaultQueryParams,
    };

    return {
        instance,
        getResource: partial(getResource, instance, fhirClientOptions),
        getResources: partial(getResources, instance, fhirClientOptions),
    };
}
