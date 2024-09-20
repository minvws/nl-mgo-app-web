import { HealthCategory } from '$/healthCategory';
import { HealthCategoryDetailList } from '../HealthCategoryDetailList/HealthCategoryDetailList';
import { type CategoryContentProps } from './HealthCategoryContent';

export function TreatmentPlan({ data }: CategoryContentProps<HealthCategory.TreatmentPlan>) {
    const { getTreatmentDirectives, getAdvanceDirectives } = data;

    return (
        <>
            <HealthCategoryDetailList
                category={HealthCategory.TreatmentPlan}
                heading="treatment_directives_heading"
                resources={getTreatmentDirectives}
            />
            <HealthCategoryDetailList
                category={HealthCategory.TreatmentPlan}
                heading="advanced_treatment_directives_heading"
                resources={getAdvanceDirectives}
            />
        </>
    );
}
