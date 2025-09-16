import { getHealthCategoryBySlug, type HealthCategory } from '$/healthCategory';
import { useParams } from '$/routing';
import { store, type HealthcareOrganization, type Resource } from '$/store';
import { type RouteParams } from '../routes';

export interface UrlParamData extends Partial<RouteParams> {
    organization: HealthcareOrganization | undefined;
    healthCategory: HealthCategory | undefined;
    resource: Resource | undefined;
}

export function useParamsData(): UrlParamData {
    const getOrganizationBySlug = store.use.getOrganizationBySlug();
    const getResourceBySlug = store.use.getResourceBySlug();
    const { organizationSlug, healthCategorySlug, resourceSlug } = useParams();

    return {
        organizationSlug,
        healthCategorySlug,
        resourceSlug,
        organization: getOrganizationBySlug(organizationSlug),
        healthCategory: getHealthCategoryBySlug(healthCategorySlug),
        resource: getResourceBySlug(resourceSlug),
    };
}
