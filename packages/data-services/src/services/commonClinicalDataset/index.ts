import { FhirVersion, createClient } from '@minvws/mgo-fhir-client';
import { DataServiceId, type DataService, type DataServiceOptions } from '../../types';
import { setupAlerts } from './sections/alerts/setupAlerts';
import { setupAllergies } from './sections/allergies/setupAllergies';
import { setupEncounters } from './sections/encounters/setupEncounters';
import { setupFunctionalStatus } from './sections/functionalStatus/setupFunctionalStatus';
import { setupMedicalAids } from './sections/medicalAids/setupMedicalAids';
import { setupMedication } from './sections/medication/setupMedication';
import { setupPatientInformation } from './sections/patientInformation/setupPatientInformation';
import { setupPaymentDetails } from './sections/paymentDetails/setupPaymentDetails';
import { setupPlannedCare } from './sections/plannedCare/setupPlannedCare';
import { setupProblems } from './sections/problems/setupProblems';
import { setupProcedures } from './sections/procedures/setupProcedures';
import { setupResults } from './sections/results/setupResults';
import { setupSocialHistory } from './sections/socialHistory/setupSocialHistory';
import { setupTreatmentDirectives } from './sections/treatmentDirectives/setupTreatmentDirectives';
import { setupVaccinations } from './sections/vaccinations/setupVaccinations';
import { setupVitalSigns } from './sections/vitalSigns/setupVitalSigns';

export function createCommonClinicalDatasetService(options: DataServiceOptions) {
    const client = createClient({
        fhirVersion: FhirVersion.R3,
        ...options,
    });

    return {
        dataServiceId: DataServiceId.CommonClinicalDataset,
        ...client,
        ...setupPatientInformation(client),
        ...setupPaymentDetails(client),
        ...setupTreatmentDirectives(client),
        ...setupFunctionalStatus(client),
        ...setupProblems(client),
        ...setupSocialHistory(client),
        ...setupAlerts(client),
        ...setupAllergies(client),
        ...setupMedication(client),
        ...setupMedicalAids(client),
        ...setupVaccinations(client),
        ...setupVitalSigns(client),
        ...setupResults(client),
        ...setupProcedures(client),
        ...setupEncounters(client),
        ...setupPlannedCare(client),
    } satisfies DataService;
}
