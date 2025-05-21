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
import { getVitalsData } from './vitals';
import { getProcedureData } from './procedure';
import { getDocumentsData } from './documents';
import { getLaboratoryResultData } from './laboratoryResults';
import { type AppMessagesIds } from '@minvws/mgo-mgo-intl';

export interface SubCategoryData {
    label: AppMessagesIds;
    data: unknown[];
}

type HealthCategoryResources = (
    resources: ResourcesState,
    organizationIds?: (string | undefined)[]
) => Record<string, SubCategoryData>;

export const healthCategoryData = {
    [HealthCategory.PersonalInformation]: getPersonalInformationData,
    [HealthCategory.PayerAndOrganization]: getPayerData,
    [HealthCategory.TreatmentPlan]: getTreatmentPlanData,
    [HealthCategory.Documents]: getDocumentsData,
    [HealthCategory.FunctionalOrMentalStatus]: getFunctionalOrMentalStatusData,
    [HealthCategory.Problems]: getProblemData,
    [HealthCategory.Lifestyle]: getLifestyleData,
    [HealthCategory.Warning]: getWarningdata,
    [HealthCategory.AllergiesAndIntolerances]: getAllergyData,
    [HealthCategory.Medication]: getMedicationData,
    [HealthCategory.MedicalDevices]: getMedicalDevicesData,
    [HealthCategory.Vaccinations]: getVaccinationData,
    [HealthCategory.LaboratoryResults]: getLaboratoryResultData,
    [HealthCategory.Procedures]: getProcedureData,
    [HealthCategory.ContactsAndAppointments]: getEncounterData,
    [HealthCategory.Vitals]: getVitalsData,
} satisfies Record<HealthCategory, HealthCategoryResources>;
