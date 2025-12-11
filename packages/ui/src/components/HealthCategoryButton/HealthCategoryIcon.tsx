import { cn } from '../../utils';
import { Icon } from '../Icon/Icon';
import { IconName } from '../Icon/icons';

export type HealthCategoryIconName = Extract<
    IconName,
    | 'health_cross'
    | 'allergy'
    | 'emergency_home'
    | 'syringe'
    | 'nutrition'
    | 'psychology'
    | 'vital_signs'
    | 'labs'
    | 'medical_services'
    | 'pill'
    | 'calendar_today'
    | 'folder'
    | 'patient_list'
    | 'health_and_safety'
    | 'medical_information'
    | 'account_balance'
    | 'group'
>;

export interface HealthCategoryIconProps {
    readonly icon: HealthCategoryIconName;
}

const categoryIconColors: Record<HealthCategoryIconName, string> = {
    health_cross: 'fill-t-cat-problems',
    allergy: 'fill-t-cat-allergies',
    emergency_home: 'fill-t-cat-warning',
    syringe: 'fill-t-cat-vaccinations',
    nutrition: 'fill-t-cat-lifestyle',
    psychology: 'fill-t-cat-mental',
    vital_signs: 'fill-t-cat-vitals',
    labs: 'fill-t-cat-laboratory',
    medical_services: 'fill-t-cat-procedures',
    pill: 'fill-t-cat-medication',
    calendar_today: 'fill-t-cat-contacts',
    folder: 'fill-t-cat-documents',
    patient_list: 'fill-t-cat-plan',
    health_and_safety: 'fill-t-cat-device',
    medical_information: 'fill-t-cat-personal',
    account_balance: 'fill-t-cat-providers',
    group: 'fill-t-cat-problems',
};

const categoryColors: Record<HealthCategoryIconName, string> = {
    health_cross: 'bg-t-cat-problems/15',
    allergy: 'bg-t-cat-allergies/15',
    emergency_home: 'bg-t-cat-warning/15',
    syringe: 'bg-t-cat-vaccinations/15',
    nutrition: 'bg-t-cat-lifestyle/15',
    psychology: 'bg-t-cat-mental/15',
    vital_signs: 'bg-t-cat-vitals/15',
    labs: 'bg-t-cat-laboratory/15',
    medical_services: 'bg-t-cat-procedures/15',
    pill: 'bg-t-cat-medication/15',
    calendar_today: 'bg-t-cat-contacts/15',
    folder: 'bg-t-cat-documents/15',
    patient_list: 'bg-t-cat-plan/15',
    health_and_safety: 'bg-t-cat-device/15',
    medical_information: 'bg-t-cat-personal/15',
    account_balance: 'bg-t-cat-providers/15',
    group: 'bg-t-cat-problems/15',
};

export const HealthCategoryIcon = ({ icon }: HealthCategoryIconProps) => (
    <div
        className={cn('flex h-8 w-8 items-center justify-center rounded-lg', categoryColors[icon])}
    >
        <Icon icon={icon} className={cn(`h-6 w-6`, `${categoryIconColors[icon]}`)} />
    </div>
);
