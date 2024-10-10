import { getPersonalInformationData } from './personalInformation';
import { getPayerData } from './payer';
import { getMedicationData } from './medication';
import { getTreatmentPlanData } from './treatmentPlan';
import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type ResourcesState } from '$/store';
import { getFunctionalOrMentalStatusData } from './functionalOrMentalStatus';
import { getProblemData } from './problem';
import { getLifestyleData } from './lifestyle';
import { getWarningdata } from './warning';
import { getAllergyData } from './allergy';
import { getMedicalDevicesData } from './medicalDevices';
import { getVaccinationData } from './vaccination';
import { getEncounterData } from './encounter';

type HealthCategoryResources = (
    resources: ResourcesState,
    organizationIds?: (string | undefined)[]
) => Record<string, unknown>;

export const healthCategoryData = {
    [HealthCategory.PersonalInformation]: getPersonalInformationData,
    [HealthCategory.PayerAndOrganization]: getPayerData,
    [HealthCategory.TreatmentPlan]: getTreatmentPlanData,
    [HealthCategory.FunctionalOrMentalStatus]: getFunctionalOrMentalStatusData,
    [HealthCategory.Problems]: getProblemData,
    [HealthCategory.Lifestyle]: getLifestyleData,
    [HealthCategory.Warning]: getWarningdata,
    [HealthCategory.AllergiesAndIntolerances]: getAllergyData,
    [HealthCategory.Medication]: getMedicationData,
    [HealthCategory.MedicalDevices]: getMedicalDevicesData,
    [HealthCategory.Vaccinations]: getVaccinationData,
    [HealthCategory.LaboratoryResults]: () => ({}),
    [HealthCategory.Procedures]: () => ({}),
    [HealthCategory.ContactsAndAppointments]: getEncounterData,
    [HealthCategory.Vitals]: () => ({}),
} satisfies Record<HealthCategory, HealthCategoryResources>;
