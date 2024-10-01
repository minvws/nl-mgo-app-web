import { HealthCategory } from '$/healthCategory';
import { HealthCategoryDetailList } from '../HealthCategoryDetailList/HealthCategoryDetailList';
import { type CategoryContentProps } from './HealthCategoryContent';

export function Problem({ data }: CategoryContentProps<HealthCategory.Problems>) {
    const { problems } = data;

    return (
        <>
            <HealthCategoryDetailList
                category={HealthCategory.Problems}
                heading="problems"
                resources={problems}
            />
        </>
    );
}
