import { HealthCategory } from '$/healthCategory';
import { type HealthCategoryData } from '$/healthCategory/useHealthCategoryData/useHealthCategoryData';
import { type FunctionComponent } from 'react';
import { Medication } from './Medication';

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
    [HealthCategory.Medication]: Medication,
    [HealthCategory.Allergies]: null,
    [HealthCategory.Complaints]: null,
    [HealthCategory.Documents]: null,
    [HealthCategory.LabResults]: null,
    [HealthCategory.Measurements]: null,
    [HealthCategory.Reports]: null,
    [HealthCategory.Treatments]: null,
    [HealthCategory.Vaccinations]: null,
} satisfies CategoryContentMap;
