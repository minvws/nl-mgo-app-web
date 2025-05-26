import { getHealthCategoryBySlug, type HealthCategory } from '$/healthCategory';
import { useParams } from '$/routing';
import {
    type HealthcareOrganization,
    type Resource,
    useOrganizationsStore,
    useResourcesStore,
} from '$/store';
import { type RouteParams } from '../routes';

interface UrlParamData extends Partial<RouteParams> {
    organization: HealthcareOrganization | undefined;
    healthCategory: HealthCategory | undefined;
    resource: Resource | undefined;
}

export function useParamsData(): UrlParamData {
    const getOrganizationBySlug = useOrganizationsStore((x) => x.getOrganizationBySlug);
    const getResourceBySlug = useResourcesStore((x) => x.getResourceBySlug);
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
