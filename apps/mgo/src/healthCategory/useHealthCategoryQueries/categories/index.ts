import { HealthCategory } from '$/healthCategory/HealthCategory';

import { type HealthcareOrganization } from '$/store';
import { type UseQueryOptions } from '@tanstack/react-query';
import { getMedicationQueries } from './medication';
import { getPayerQueries } from './payer';
import { getPersonalInformationQueries } from './personalInformation';
import { getTreatmentPlanQueries } from './treatmentPlan';

export const healthCategoryQueries = {
    [HealthCategory.PersonalInformation]: getPersonalInformationQueries,
    [HealthCategory.PayerAndOrganization]: getPayerQueries,
    [HealthCategory.TreatmentPlan]: getTreatmentPlanQueries,
    [HealthCategory.FunctionalOrMentalStatus]: () => [],
    [HealthCategory.Problems]: () => [],
    [HealthCategory.Lifestyle]: () => [],
    [HealthCategory.Warning]: () => [],
    [HealthCategory.AllergiesAndIntolerances]: () => [],
    [HealthCategory.Medication]: getMedicationQueries,
    [HealthCategory.MedicalDevices]: () => [],
    [HealthCategory.Vaccinations]: () => [],
    [HealthCategory.LaboratoryResults]: () => [],
    [HealthCategory.Procedures]: () => [],
    [HealthCategory.ContactsAndAppointments]: () => [],
    [HealthCategory.Vitals]: () => [],
} satisfies Record<HealthCategory, (organization: HealthcareOrganization) => UseQueryOptions[]>;
