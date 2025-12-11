import { getDataServiceEndpointConfig } from '$/config';
import { createDataService } from '$/services';
import { isFhirResource } from '@minvws/mgo-fhir';
import { getBundleResources, getMgoResource } from '@minvws/mgo-hcim';
import { isNonNullish } from '@minvws/mgo-utils';

export interface HealthRequest {
    dataServiceId: string;
    endpointId: string;
    resourceEndpoint: string;
}

export async function fetchHealthData({
    dataServiceId,
    resourceEndpoint,
    endpointId,
}: HealthRequest) {
    const endpoint = getDataServiceEndpointConfig(dataServiceId, endpointId);
    const dataService = createDataService({
        dataServiceId,
        resourceEndpoint,
    });

    if (!dataService || !endpoint) {
        throw new Error('No data service or endpoint was found!');
    }

    const today = new Date().toISOString().split('T')[0];
    const parsedEndpointPath = endpoint.path.replace(/^\/+/, '').replace('{{today}}', today);
    const data = await dataService.get(parsedEndpointPath).json();

    if (!isFhirResource(data, 'Bundle')) {
        throw new Error(
            `Response for data service ${dataServiceId}:${endpointId} - does not seem to contain a Fhir Bundle.`
        );
    }

    return getBundleResources(data)
        .map((fhirResource) =>
            getMgoResource(fhirResource, { fhirVersion: dataService.meta.fhirVersionEnum })
        )
        .filter(isNonNullish);
}
