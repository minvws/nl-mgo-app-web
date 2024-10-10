import { HealthCategory } from '$/healthCategory';
import { Stack } from '@minvws/mgo-mgo-ui';
import { HealthCategoryDetailList } from '../HealthCategoryDetailList/HealthCategoryDetailList';
import { type CategoryContentProps } from './HealthCategoryContent';

export function Vaccination({ data }: CategoryContentProps<HealthCategory.Vaccinations>) {
    const { vaccinations } = data;

    return (
        <Stack className="gap-4 md:gap-6">
            <HealthCategoryDetailList
                category={HealthCategory.Vaccinations}
                heading="vaccinations"
                resources={vaccinations}
            />
        </Stack>
    );
}
