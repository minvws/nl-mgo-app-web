import { createClient } from '../../client';
import { type FhirClientOptions } from '../../types';
import { setupPatientInformation } from '../sections/patientInformation/setupPatientInformation';
import { setupPaymentDetails } from '../sections/paymentDetails/setupPaymentDetails';
import { setupTreatmentDirectives } from '../sections/treatmentDirectives/setupTreatmentDirectives';
import { setupFunctionalStatus } from '../sections/functionalStatus/setupFunctionalStatus';
import { setupProblems } from '../sections/problems/setupProblems';
import { setupSocialHistory } from '../sections/socialHistory/setupSocialHistory';
import { setupAlerts } from '../sections/alerts/setupAlerts';
import { setupAllergies } from '../sections/allergies/setupAllergies';
import { setupMedication } from '../sections/medication/setupMedication';
import { setupMedicalAids } from '../sections/medicalAids/setupMedicalAids';
import { setupVaccinations } from '../sections/vaccinations/setupVaccinations';
import { setupVitalSigns } from '../sections/vitalSigns/setupVitalSigns';
import { setupResults } from '../sections/results/setupResults';
import { setupProcedures } from '../sections/procedures/setupProcedures';
import { setupEncounters } from '../sections/encounters/setupEncounters';
import { setupPlannedCare } from '../sections/plannedCare/setupPlannedCare';
import { type DataService, DataServiceId } from '../../DataService';
import { FhirVersion } from '@minvws/mgo-fhir-data';

export function createBgzClient(options: FhirClientOptions) {
    const client = createClient(options);

    return {
        dataServiceId: DataServiceId.CommonClinicalDataset,
        fhirVersion: FhirVersion.R3,
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
