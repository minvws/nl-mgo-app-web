import { appConfig, getDataServiceConfig } from '$/config';
import { FhirVersion } from '@minvws/mgo-fhir';
import { losslessParse } from '@minvws/mgo-utils';
import ky, { type KyInstance } from 'ky';
import { Writable } from 'type-fest';

export interface DataServiceOptions {
    dataServiceId?: string;
    resourceEndpoint?: string;
}

export type DataService = KyInstance & {
    readonly meta: {
        readonly dataServiceId: string;
        readonly fhirVersionEnum: FhirVersion;
    };
};

export function createDataService({
    dataServiceId,
    resourceEndpoint,
}: DataServiceOptions): DataService | undefined {
    const dataServiceConfig = getDataServiceConfig(dataServiceId);

    if (!dataServiceConfig || !resourceEndpoint) {
        return;
    }

    const dataService = ky.create({
        prefixUrl: `${appConfig.dva_url}/fhir`,
        parseJson: losslessParse,
        timeout: 10000,
        headers: {
            Accept: `application/fhir+json; fhirVersion=${dataServiceConfig.fhirVersion}`,
            'x-mgo-dva-target': resourceEndpoint,
        },
    });

    (dataService as unknown as Writable<DataService, 'meta'>).meta = {
        dataServiceId: dataServiceConfig.id,
        fhirVersionEnum: dataServiceConfig.fhirVersionEnum as FhirVersion,
    };

    return dataService as DataService;
}
