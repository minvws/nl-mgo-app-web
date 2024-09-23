import { HealthCategory } from '$/healthCategory';
import { Stack } from '@minvws/mgo-mgo-ui';
import { HealthCategoryDetailList } from '../HealthCategoryDetailList/HealthCategoryDetailList';
import { type CategoryContentProps } from './HealthCategoryContent';

export function Lifestyle({ data }: CategoryContentProps<HealthCategory.Lifestyle>) {
    const { currentLivingSituation, drugUse, alchoholuse, tabaccoUse, nutritionAdvice } = data;

    return (
        <Stack className="gap-4 md:gap-6">
            <HealthCategoryDetailList
                category={HealthCategory.Lifestyle}
                heading="living_situation"
                resources={currentLivingSituation}
            />
            <HealthCategoryDetailList
                category={HealthCategory.Lifestyle}
                heading="drug_use"
                resources={drugUse}
            />
            <HealthCategoryDetailList
                category={HealthCategory.Lifestyle}
                heading="alchohol_use"
                resources={alchoholuse}
            />
            <HealthCategoryDetailList
                category={HealthCategory.Lifestyle}
                heading="tabacco_use"
                resources={tabaccoUse}
            />
            <HealthCategoryDetailList
                category={HealthCategory.Lifestyle}
                heading="nutrition_adivce"
                resources={nutritionAdvice}
            />
        </Stack>
    );
}
