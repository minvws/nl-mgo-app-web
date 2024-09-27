/* c8 ignore start - temp ignore for release */
import { HealthCategory } from '$/healthCategory';
import { Stack } from '@minvws/mgo-mgo-ui';
import { HealthCategoryDetailList } from '../HealthCategoryDetailList/HealthCategoryDetailList';
import { type CategoryContentProps } from './HealthCategoryContent';

export function MedicalDevices({ data }: CategoryContentProps<HealthCategory.MedicalDevices>) {
    const { medicalDevices, medicalDeviceProducts } = data;

    return (
        <Stack className="gap-4 md:gap-6">
            <HealthCategoryDetailList
                category={HealthCategory.MedicalDevices}
                heading="medical_devices"
                resources={medicalDevices}
            />
            <HealthCategoryDetailList
                category={HealthCategory.MedicalDevices}
                heading="medical_device_products"
                resources={medicalDeviceProducts}
            />
        </Stack>
    );
}
