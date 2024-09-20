import { HealthCategory, healthCategorySlugs } from '$/healthCategory';
import { type QueryResult } from '$/healthCategory/useHealthCategoryQuery/useHealthCategoryQuery';
import { RouterLink } from '$/routing';
import { CategoryButton, type CategoryButtonProps } from '@minvws/mgo-mgo-ui';
import { FormattedMessage, useIntl } from 'react-intl';

export interface HealthCategoryButtonProps<T extends HealthCategory> {
    readonly query: QueryResult<T>;
}

export function HealthCategoryButton<T extends HealthCategory>({
    query,
}: HealthCategoryButtonProps<T>) {
    const intl = useIntl();

    const iconMap: Record<HealthCategory, CategoryButtonProps['icon']> = {
        [HealthCategory.PersonalInformation]: 'person',
        [HealthCategory.PayerAndOrganization]: 'stethoscope',
        [HealthCategory.TreatmentPlan]: 'event-note',
        [HealthCategory.FunctionalOrMentalStatus]: 'sentiment-satisfied',
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

    if (!query.isLoading && query.isEmpty) {
        return (
            <CategoryButton icon={iconMap[query.category] ?? 'more-horiz'} isDisabled label={intl.formatMessage({ id: 'common.no-results' })}>
                <FormattedMessage id={`${query.category}_heading`} />
            </CategoryButton>
        );
    }

    return (
        <CategoryButton
            asChild
            icon={iconMap[query.category] ?? undefined}
            loadingText={intl.formatMessage({ id: 'common.loading' })}
            isLoading={query.isLoading}
        >
            <RouterLink to={`./${healthCategorySlugs[query.category]}`}>
                <FormattedMessage id={`${query.category}_heading`} />
            </RouterLink>
        </CategoryButton>
    );
}
