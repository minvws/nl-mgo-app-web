/* c8 ignore start - temp ignore for release */
import { HealthCategory } from '$/healthCategory';
import { HealthCategoryDetailList } from '../HealthCategoryDetailList/HealthCategoryDetailList';
import { type CategoryContentProps } from './HealthCategoryContent';

export function Warning({ data }: CategoryContentProps<HealthCategory.Warning>) {
    const { warnings } = data;
    return (
        <>
            <HealthCategoryDetailList
                category={HealthCategory.Warning}
                heading="warnings"
                resources={warnings}
            />
        </>
    );
}
