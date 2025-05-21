import { FhirVersion, createClient } from '@minvws/mgo-fhir-client';
import { DataServiceId, type DataService, type DataServiceOptions } from '../../types';
import { setupCompositions } from './sections/compositions/setupCompositions';
import { setupEncounters } from './sections/encounters/setupEncounters';
import { setupEpisodeOfCare } from './sections/episodeOfCare/setupEpisodeOfCare';
import { setupMedicationIntolerance } from './sections/medicationIntolerance/setupMedicationIntolerance';
import { setupMedicationRequest } from './sections/medicationRequest/setupMedicationRequest';
import { setupObservations } from './sections/observations/setupObservations';
import { setupPatient } from './sections/patient/setupPatient';

export function createGeneralPractitionerService(options: DataServiceOptions) {
    const client = createClient({
        fhirVersion: FhirVersion.R3,
        ...options,
    });

    return {
        dataServiceId: DataServiceId.GeneralPractitioner,
        ...client,
        ...setupPatient(client),
        ...setupEpisodeOfCare(client),
        ...setupMedicationRequest(client),
        ...setupMedicationIntolerance(client),
        ...setupObservations(client),
        ...setupCompositions(client),
        ...setupEncounters(client),
    } satisfies DataService;
}
