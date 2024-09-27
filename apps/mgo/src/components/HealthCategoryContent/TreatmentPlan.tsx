/* c8 ignore start - temp ignore for release */
import { HealthCategory } from '$/healthCategory';
import { Stack } from '@minvws/mgo-mgo-ui';
import { HealthCategoryDetailList } from '../HealthCategoryDetailList/HealthCategoryDetailList';
import { type CategoryContentProps } from './HealthCategoryContent';

export function TreatmentPlan({ data }: CategoryContentProps<HealthCategory.TreatmentPlan>) {
    const { getTreatmentDirectives, getAdvanceDirectives } = data;

    return (
        <Stack className="gap-4 md:gap-6">
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
        </Stack>
    );
}
