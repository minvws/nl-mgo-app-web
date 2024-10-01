import { HealthCategory } from '$/healthCategory';
import { HealthCategoryDetailList } from '../HealthCategoryDetailList/HealthCategoryDetailList';
import { type CategoryContentProps } from './HealthCategoryContent';

export function PersonalInformation({
    data,
}: CategoryContentProps<HealthCategory.PersonalInformation>) {
    const { patientInformation } = data;

    return (
        <>
            <HealthCategoryDetailList
                category={HealthCategory.PersonalInformation}
                heading="patient"
                resources={patientInformation}
            />
        </>
    );
}
