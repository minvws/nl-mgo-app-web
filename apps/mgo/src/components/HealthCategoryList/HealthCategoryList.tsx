import { HealthCategory, useHealthCategoryQuery } from '$/healthCategory';
import { type QueryResult } from '$/healthCategory/useHealthCategoryQuery/useHealthCategoryQuery';
import { type HealthcareOrganization } from '$/store';
import { ListWrapper, Stack } from '@minvws/mgo-mgo-ui';
import { HealthCategoryButton } from './HealthCategoryButton';

export interface CategoryListProps {
    readonly organization?: HealthcareOrganization;
}

export function HealthCategoryList({ organization }: CategoryListProps) {
    const organizationFilter = organization ? [organization.id] : undefined;

    const categoryQueries: QueryResult<HealthCategory>[] = [
        useHealthCategoryQuery(HealthCategory.PersonalInformation, organizationFilter),
        useHealthCategoryQuery(HealthCategory.PayerAndOrganization, organizationFilter),
        useHealthCategoryQuery(HealthCategory.Medication, organizationFilter),
        useHealthCategoryQuery(HealthCategory.TreatmentPlan, organizationFilter),
        useHealthCategoryQuery(HealthCategory.FunctionalOrMentalStatus, organizationFilter),
        useHealthCategoryQuery(HealthCategory.Problems, organizationFilter),
        useHealthCategoryQuery(HealthCategory.Lifestyle, organizationFilter),
        useHealthCategoryQuery(HealthCategory.Documents, organizationFilter),
        useHealthCategoryQuery(HealthCategory.Warning, organizationFilter),
        useHealthCategoryQuery(HealthCategory.AllergiesAndIntolerances, organizationFilter),
        useHealthCategoryQuery(HealthCategory.MedicalDevices, organizationFilter),
        useHealthCategoryQuery(HealthCategory.Vaccinations, organizationFilter),
        useHealthCategoryQuery(HealthCategory.LaboratoryResults, organizationFilter),
        useHealthCategoryQuery(HealthCategory.Procedures, organizationFilter),
        useHealthCategoryQuery(HealthCategory.ContactsAndAppointments, organizationFilter),
        useHealthCategoryQuery(HealthCategory.Vitals, organizationFilter),
    ];

    const completed = categoryQueries
        .filter((query) => !query.isLoading && !query.isEmpty)
        .map((query) => <HealthCategoryButton key={query.id} query={query} />);

    const loading = categoryQueries
        .filter((query) => query.isLoading)
        .map((query) => <HealthCategoryButton key={query.id} query={query} />);

    const empty = categoryQueries
        .filter((query) => !query.isLoading && query.isEmpty)
        .map((query) => <HealthCategoryButton key={query.id} query={query} />);

    return (
        <Stack className="gap-6">
            <ListWrapper gap="line">{completed}</ListWrapper>
            <ListWrapper gap="line">{loading}</ListWrapper>
            <ListWrapper gap="line">{empty}</ListWrapper>
        </Stack>
    );
}
