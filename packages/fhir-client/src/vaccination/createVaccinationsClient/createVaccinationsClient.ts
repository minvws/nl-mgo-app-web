import { type DataService, DataServiceId } from '../../DataService';
import { createClient } from '../../client';
import { type FhirClientOptions } from '../../types';
import { setupVaccinations } from '../sections/vaccinations/setupVaccinations';
import { FhirVersion } from '@minvws/mgo-fhir-data';

export function createVaccinationsClient(options: FhirClientOptions) {
    const client = createClient(options);

    return {
        dataServiceId: DataServiceId.Vaccinations,
        fhirVersion: FhirVersion.R4,
        ...client,
        ...setupVaccinations(client),
    } satisfies DataService;
}
