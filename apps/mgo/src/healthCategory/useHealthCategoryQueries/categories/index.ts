import { HealthCategory } from '$/healthCategory/HealthCategory';

import { type HealthcareOrganization } from '$/store';
import { type UseQueryOptions } from '@tanstack/react-query';
import { getMedicationQueries } from './medication';
import { getPayerQueries } from './payer';
import { getPersonalInformationQueries } from './personalInformation';
import { getTreatmentPlanQueries } from './treatmentPlan';
import { getFunctionalOrMentalStatusQueries } from './functionalOrMentalStatus';
import { getProblemQueries } from './problem';
import { getLifestyleQueries } from './lifestyle';
import { getWarningQueries } from './warning';
import { getAllergyQueries } from './allergy';
import { getMedicalDevicesQueries } from './medicalDevices';
import { getVaccinationQueries } from './vaccination';

export const healthCategoryQueries = {
    [HealthCategory.PersonalInformation]: getPersonalInformationQueries,
    [HealthCategory.PayerAndOrganization]: getPayerQueries,
    [HealthCategory.TreatmentPlan]: getTreatmentPlanQueries,
    [HealthCategory.FunctionalOrMentalStatus]: getFunctionalOrMentalStatusQueries,
    [HealthCategory.Problems]: getProblemQueries,
    [HealthCategory.Lifestyle]: getLifestyleQueries,
    [HealthCategory.Warning]: getWarningQueries,
    [HealthCategory.AllergiesAndIntolerances]: getAllergyQueries,
    [HealthCategory.Medication]: getMedicationQueries,
    [HealthCategory.MedicalDevices]: getMedicalDevicesQueries,
    [HealthCategory.Vaccinations]: getVaccinationQueries,
    [HealthCategory.LaboratoryResults]: () => [],
    [HealthCategory.Procedures]: () => [],
    [HealthCategory.ContactsAndAppointments]: () => [],
    [HealthCategory.Vitals]: () => [],
} satisfies Record<HealthCategory, (organization: HealthcareOrganization) => UseQueryOptions[]>;
