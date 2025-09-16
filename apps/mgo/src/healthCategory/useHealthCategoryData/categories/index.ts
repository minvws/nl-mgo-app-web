import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type StoreState } from '$/store';
import { type AppMessagesIds } from '@minvws/mgo-intl';
import { getAllergyData } from './allergy';
import { getDocumentsData } from './documents';
import { getEncounterData } from './encounter';
import { getFunctionalOrMentalStatusData } from './functionalOrMentalStatus';
import { getLaboratoryResultData } from './laboratoryResults';
import { getLifestyleData } from './lifestyle';
import { getMedicalDevicesData } from './medicalDevices';
import { getMedicationData } from './medication';
import { getPayerData } from './payer';
import { getPersonalInformationData } from './personalInformation';
import { getProblemData } from './problem';
import { getProcedureData } from './procedure';
import { getTreatmentPlanData } from './treatmentPlan';
import { getVaccinationData } from './vaccination';
import { getVitalsData } from './vitals';
import { getWarningdata } from './warning';

export interface SubCategoryData {
    label: AppMessagesIds;
    data: unknown[];
}

type HealthCategoryResources = (
    getResourcesByProfile: StoreState['getResourcesByProfile'],
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
