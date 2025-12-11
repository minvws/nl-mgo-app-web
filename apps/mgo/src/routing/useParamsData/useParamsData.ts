import { HealthCategoryConfig } from '$/config';
import { useHealthCategoryBySlug } from '$/hooks';
import { useParams } from '$/routing';
import { useStore, type HealthcareOrganization, type Resource } from '$/store';
import { type RouteParams } from '../routes';

export interface UrlParamData extends Partial<RouteParams> {
    organization: HealthcareOrganization | undefined;
    healthCategory: HealthCategoryConfig | undefined;
    resource: Resource | undefined;
}

export function useParamsData(): UrlParamData {
    const getOrganizationBySlug = useStore.use.getOrganizationBySlug();
    const getResourceBySlug = useStore.use.getResourceBySlug();
    const { organizationSlug, healthCategorySlug, resourceSlug } = useParams();

    return {
        organizationSlug,
        healthCategorySlug,
        resourceSlug,
        organization: getOrganizationBySlug(organizationSlug),
        healthCategory: useHealthCategoryBySlug(healthCategorySlug),
        resource: getResourceBySlug(resourceSlug),
    };
}
