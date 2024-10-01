import { HealthCategory } from '$/healthCategory';
import { Stack } from '@minvws/mgo-mgo-ui';
import { HealthCategoryDetailList } from '../HealthCategoryDetailList/HealthCategoryDetailList';
import { type CategoryContentProps } from './HealthCategoryContent';

export function Medication({ data }: CategoryContentProps<HealthCategory.Medication>) {
    const { medicationUse, medicationAgreements, administrationAgreements } = data;
    return (
        <Stack className="gap-4 md:gap-6">
            <HealthCategoryDetailList
                category={HealthCategory.Medication}
                heading="medication_use"
                resources={medicationUse}
            />
            <HealthCategoryDetailList
                category={HealthCategory.Medication}
                heading="medication_agreements"
                resources={medicationAgreements}
            />
            <HealthCategoryDetailList
                category={HealthCategory.Medication}
                heading="administration_agreements"
                resources={administrationAgreements}
            />
        </Stack>
    );
}
