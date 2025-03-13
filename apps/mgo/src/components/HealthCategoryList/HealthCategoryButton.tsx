import { HealthCategory, healthCategorySlugs } from '$/healthCategory';
import { type QueryResult } from '$/healthCategory/useHealthCategoryQuery/useHealthCategoryQuery';
import { FormattedMessage, useIntl } from '$/intl';
import { RouterLink } from '$/routing';
import { CategoryButton, type CategoryButtonProps } from '@minvws/mgo-mgo-ui';

export interface HealthCategoryButtonProps<T extends HealthCategory> {
    readonly query: QueryResult<T>;
}

export function HealthCategoryButton<T extends HealthCategory>({
    query,
}: HealthCategoryButtonProps<T>) {
    const { formatMessage } = useIntl();

    const iconMap: Record<HealthCategory, CategoryButtonProps['icon']> = {
        [HealthCategory.PersonalInformation]: 'person',
        [HealthCategory.PayerAndOrganization]: 'stethoscope',
        [HealthCategory.TreatmentPlan]: 'event-note',
        [HealthCategory.FunctionalOrMentalStatus]: 'sentiment-satisfied',
        [HealthCategory.Documents]: 'folder',
        [HealthCategory.Problems]: 'diagnosis',
        [HealthCategory.Lifestyle]: 'nutrition',
        [HealthCategory.Warning]: 'emergency-home',
        [HealthCategory.AllergiesAndIntolerances]: 'allergy',
        [HealthCategory.Medication]: 'pill',
        [HealthCategory.MedicalDevices]: 'health-and-safety',
        [HealthCategory.Vaccinations]: 'syringe',
        [HealthCategory.LaboratoryResults]: 'labs',
        [HealthCategory.Procedures]: 'medical-services',
        [HealthCategory.ContactsAndAppointments]: 'date-range',
        [HealthCategory.Vitals]: 'vital-signs',
    };

    return (
        <CategoryButton
            asChild
            icon={iconMap[query.category]}
            loadingText={formatMessage('common.loading')}
            isLoading={query.isLoading}
            label={!query.isLoading && query.isEmpty ? formatMessage('common.no_data') : undefined}
        >
            <RouterLink to={`./${healthCategorySlugs[query.category]}`}>
                <FormattedMessage id={`hc_${query.category}.heading`} />
            </RouterLink>
        </CategoryButton>
    );
}
