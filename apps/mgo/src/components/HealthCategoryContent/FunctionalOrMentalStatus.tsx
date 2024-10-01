import { HealthCategory } from '$/healthCategory';
import { HealthCategoryDetailList } from '../HealthCategoryDetailList/HealthCategoryDetailList';
import { type CategoryContentProps } from './HealthCategoryContent';

export function FunctionalOrMentalStatus({
    data,
}: CategoryContentProps<HealthCategory.FunctionalOrMentalStatus>) {
    const { functionalOrMentalStatus } = data;

    return (
        <>
            <HealthCategoryDetailList
                category={HealthCategory.FunctionalOrMentalStatus}
                heading="functional_or_mental_status"
                resources={functionalOrMentalStatus}
            />
        </>
    );
}
