import { HealthCategory } from '$/healthCategory';
import { Stack } from '@minvws/mgo-mgo-ui';
import { HealthCategoryDetailList } from '../HealthCategoryDetailList/HealthCategoryDetailList';
import { type CategoryContentProps } from './HealthCategoryContent';

export function Encounter({ data }: CategoryContentProps<HealthCategory.ContactsAndAppointments>) {
    const { encounters } = data;

    return (
        <Stack className="gap-4 md:gap-6">
            <HealthCategoryDetailList
                category={HealthCategory.ContactsAndAppointments}
                heading="encounters"
                resources={encounters}
            />
        </Stack>
    );
}
