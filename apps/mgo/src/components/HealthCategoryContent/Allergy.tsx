import { HealthCategory } from '$/healthCategory';
import { HealthCategoryDetailList } from '../HealthCategoryDetailList/HealthCategoryDetailList';
import { type CategoryContentProps } from './HealthCategoryContent';

export function Allergy({ data }: CategoryContentProps<HealthCategory.AllergiesAndIntolerances>) {
    const { allergies } = data;
    return (
        <>
            <HealthCategoryDetailList
                category={HealthCategory.AllergiesAndIntolerances}
                heading="allergy"
                resources={allergies}
            />
        </>
    );
}
