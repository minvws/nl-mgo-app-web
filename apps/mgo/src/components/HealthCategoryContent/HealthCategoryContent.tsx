import { HealthCategory } from '$/healthCategory';
import { type HealthCategoryData } from '$/healthCategory/useHealthCategoryData/useHealthCategoryData';
import { type FunctionComponent } from 'react';
import { Allergy } from './Allergy';
import { FunctionalOrMentalStatus } from './FunctionalOrMentalStatus';
import { Lifestyle } from './Lifestyle';
import { MedicalDevices } from './MedicalDevices';
import { Medication } from './Medication';
import { Payer } from './PayerAndOrganization';
import { PersonalInformation } from './PersonalInformation';
import { Problem } from './Problem';
import { TreatmentPlan } from './TreatmentPlan';
import { Warning } from './Warning';
import { Vaccination } from './Vaccination';

export interface CategoryContentProps<T extends HealthCategory> {
    readonly data: HealthCategoryData<T>;
}

export type HealthCategoryContentComponent<T extends HealthCategory> = FunctionComponent<
    CategoryContentProps<T>
>;

type CategoryContentMap = {
    [key in HealthCategory]: HealthCategoryContentComponent<key> | null;
};

const categoryContent = {
    [HealthCategory.PersonalInformation]: PersonalInformation,
    [HealthCategory.PayerAndOrganization]: Payer,
    [HealthCategory.TreatmentPlan]: TreatmentPlan,
    [HealthCategory.FunctionalOrMentalStatus]: FunctionalOrMentalStatus,
    [HealthCategory.Problems]: Problem,
    [HealthCategory.Lifestyle]: Lifestyle,
    [HealthCategory.Warning]: Warning,
    [HealthCategory.AllergiesAndIntolerances]: Allergy,
    [HealthCategory.Medication]: Medication,
    [HealthCategory.MedicalDevices]: MedicalDevices,
    [HealthCategory.Vaccinations]: Vaccination,
    [HealthCategory.LaboratoryResults]: null,
    [HealthCategory.Procedures]: null,
    [HealthCategory.ContactsAndAppointments]: null,
    [HealthCategory.Vitals]: null,
} satisfies CategoryContentMap;

export interface HealthCategoryContentProps<T extends HealthCategory> {
    readonly category: T;
    readonly data: HealthCategoryData<T>;
}

export function HealthCategoryContent<T extends HealthCategory>({
    category,
    data,
}: HealthCategoryContentProps<T>) {
    const CategoryContent = categoryContent[category] as HealthCategoryContentComponent<
        typeof category
    > | null;

    /* c8 ignore start - null shoud not happen */
    return CategoryContent ? <CategoryContent data={data} /> : null;
}
