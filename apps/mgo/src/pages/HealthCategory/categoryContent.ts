import { HealthCategory } from '$/healthCategory';
import { type HealthCategoryData } from '$/healthCategory/useHealthCategoryData/useHealthCategoryData';
import { type FunctionComponent } from 'react';
import { Payer, PersonalInformation, TreatmentPlan } from './categories';

export interface CategoryContentProps<T extends HealthCategory> {
    readonly data: HealthCategoryData<T>;
}

export type HealthCategoryContentComponent<T extends HealthCategory> = FunctionComponent<
    CategoryContentProps<T>
>;

type CategoryContentMap = {
    [key in HealthCategory]: HealthCategoryContentComponent<key> | null;
};

export const categoryContent = {
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
