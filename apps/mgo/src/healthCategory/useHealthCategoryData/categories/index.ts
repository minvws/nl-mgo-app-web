import { getPersonalInformationData } from './personalInformation';
import { getPayerData } from './payer';
import { getMedicationData } from './medication';
import { getTreatmentPlanData } from './treatmentPlan';
import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type ResourcesState } from '$/store';

type HealthCategoryResources = (
    resources: ResourcesState,
    organizationIds?: (string | undefined)[]
) => Record<string, unknown>;

export const healthCategoryData = {
    [HealthCategory.PersonalInformation]: getPersonalInformationData,
    [HealthCategory.PayerAndOrganization]: getPayerData,
    [HealthCategory.TreatmentPlan]: getTreatmentPlanData,
    [HealthCategory.FunctionalOrMentalStatus]: () => ({}),
    [HealthCategory.Problems]: () => ({}),
    [HealthCategory.Lifestyle]: () => ({}),
    [HealthCategory.Warning]: () => ({}),
    [HealthCategory.AllergiesAndIntolerances]: () => ({}),
    [HealthCategory.Medication]: getMedicationData,
    [HealthCategory.MedicalDevices]: () => ({}),
    [HealthCategory.Vaccinations]: () => ({}),
    [HealthCategory.LaboratoryResults]: () => ({}),
    [HealthCategory.Procedures]: () => ({}),
    [HealthCategory.ContactsAndAppointments]: () => ({}),
    [HealthCategory.Vitals]: () => ({}),
} satisfies Record<HealthCategory, HealthCategoryResources>;
