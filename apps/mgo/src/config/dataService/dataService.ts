import {
    dataServicesConfig,
    type DataServiceConfig,
    type DataServiceEndpointConfig,
} from '@minvws/mgo-config';

export type { DataServiceConfig, DataServiceEndpointConfig };

const dataServiceConfigs = Object.values(dataServicesConfig);

export function getDataServiceConfig(dataServiceId?: string) {
    return dataServiceConfigs.find((x) => x.id === dataServiceId);
}

export function getDataServiceEndpointConfig(dataServiceId: string, endpointId: string) {
    const dataServiceConfig = getDataServiceConfig(dataServiceId);
    return dataServiceConfig?.endpoints.find((endpoint) => endpoint.id === endpointId);
}
