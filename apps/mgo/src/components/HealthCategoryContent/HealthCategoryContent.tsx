import { HealthCategory } from '$/healthCategory';
import { type HealthCategoryData } from '$/healthCategory/useHealthCategoryData/useHealthCategoryData';
import { type FunctionComponent } from 'react';
import { PersonalInformation } from './PersonalInformation';
import { Payer } from './PayerAndOrganization';
import { TreatmentPlan } from './TreatmentPlan';

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
    [HealthCategory.FunctionalOrMentalStatus]: null,
    [HealthCategory.Problems]: null,
    [HealthCategory.Lifestyle]: null,
    [HealthCategory.Warning]: null,
    [HealthCategory.AllergiesAndIntolerances]: null,
    [HealthCategory.Medication]: null,
    [HealthCategory.MedicalDevices]: null,
    [HealthCategory.Vaccinations]: null,
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

    return CategoryContent ? <CategoryContent data={data} /> : null;
}
