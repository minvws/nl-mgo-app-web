import { HealthCategory } from '$/healthCategory';
import { HealthCategoryDetailList } from '../HealthCategoryDetailList/HealthCategoryDetailList';
import { type CategoryContentProps } from './HealthCategoryContent';

export function MedicalDevices({ data }: CategoryContentProps<HealthCategory.MedicalDevices>) {
    const { medicalDevices } = data;

    return (
        <>
            <HealthCategoryDetailList
                category={HealthCategory.MedicalDevices}
                heading="medical_devices"
                resources={medicalDevices}
            />
        </>
    );
}
