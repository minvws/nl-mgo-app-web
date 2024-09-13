import { type DataService, DataServiceId } from '../../DataService';
import { createClient } from '../../client';
import type { FhirClientOptions } from '../../types';
import { setupVaccinations } from '../sections/vaccinations/setupVaccinations';

export function createVaccinationsClient(options: FhirClientOptions) {
    const client = createClient(options);

    return {
        dataServiceId: DataServiceId.Vaccinations,
        ...client,
        ...setupVaccinations(client),
    } satisfies DataService;
}
