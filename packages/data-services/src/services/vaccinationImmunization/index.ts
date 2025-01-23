import { FhirVersion, createClient } from '@minvws/mgo-fhir-client';
import { DataServiceId, type DataService, type DataServiceOptions } from '../../types';
import { setupVaccinations } from './sections/vaccinations/setupVaccinations';

export function createVaccinationImmunizationService(options: DataServiceOptions) {
    const client = createClient({
        fhirVersion: FhirVersion.R4,
        ...options,
    });

    return {
        dataServiceId: DataServiceId.VaccinationImmunization,
        ...client,
        ...setupVaccinations(client),
    } satisfies DataService;
}
