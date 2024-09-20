import { HealthCategory } from '$/healthCategory';
import { HealthCategoryDetailList } from '../HealthCategoryDetailList/HealthCategoryDetailList';
import { type CategoryContentProps } from './HealthCategoryContent';

export function Medication({ data }: CategoryContentProps<HealthCategory.Medication>) {
    const { medicationUse } = data;
    return (
        <>
            <HealthCategoryDetailList
                category={HealthCategory.Medication}
                heading="medication_use"
                resources={medicationUse}
            />
        </>
    );
}
