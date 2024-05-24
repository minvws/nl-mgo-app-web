import ky from 'ky';
import type { FhirClientOptions } from '../../types';
import { setupRequestHandler } from '../../utils/setupRequestHandler/setupRequestHandler';
import { getResource } from '../getResource/getResource';
import { getResources } from '../getResources/getResources';
import { parseJson as safeParse } from '../json/json';
import { defaultsSearchParams } from '../../utils/defaultsSearchParams/defaultsSearchParams';

export function createClient({ parseJson = safeParse, searchParams, ...rest }: FhirClientOptions) {
    searchParams = defaultsSearchParams({ _format: 'json' }, searchParams);
    const defaultOptions = { parseJson, searchParams, ...rest };

    /**
     * Note that we do not pass any default searchParams to the instance.
     * Ky does not manage merging the searchParams properly. Therefore, we will manage it ourselves.
     */
    const instance = ky.create({ parseJson, ...rest });

    return {
        instance,
        getResource: setupRequestHandler(getResource, instance, defaultOptions),
        getResources: setupRequestHandler(getResources, instance, defaultOptions),
    };
}

export type FhirClient = ReturnType<typeof createClient>;
