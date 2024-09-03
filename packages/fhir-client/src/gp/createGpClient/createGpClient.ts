import { createClient } from '../../client';
import type { FhirClientOptions } from '../../types';
import { setupEpisodeOfCare } from '../sections/episodeOfCare/setupEpisodeOfCare';
import { setupMedicationRequest } from '../sections/medicationRequest/setupMedicationRequest';
import { setupPatient } from '../sections/patient/setupPatient';
import { setupMedicationIntolerance } from '../sections/medicationIntolerance/setupMedicationIntolerance';
import { setupObservations } from '../sections/observations/setupObservations';
import { setupCompositions } from '../sections/compositions/setupCompositions';
import { setupEncounters } from '../sections/encounters/setupEncounters';

export function createGpClient(options: FhirClientOptions) {
    const client = createClient(options);

    return {
        ...client,
        ...setupPatient(client),
        ...setupEpisodeOfCare(client),
        ...setupMedicationRequest(client),
        ...setupMedicationIntolerance(client),
        ...setupObservations(client),
        ...setupCompositions(client),
        ...setupEncounters(client),
    };
}
