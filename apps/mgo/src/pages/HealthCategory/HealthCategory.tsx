import { getHealthCategoryBySlug } from '$/healthCategory';
import { Navigate, useParams } from '$/routing';
import { useOrganizationsStore } from '$/store';
import { NotFound } from '../NotFound/NotFound';
import { HealthCategoryItems } from './HealthCategoryItems';

export function HealthCategory() {
    const { healthCategorySlug, organizationSlug } = useParams();
    const { getOrganizationBySlug } = useOrganizationsStore();

    const healthCategory = getHealthCategoryBySlug(healthCategorySlug!);
    const organization = getOrganizationBySlug(organizationSlug);

    if (!healthCategory) {
        return <NotFound className="flex flex-col items-center text-center" />;
    }

    if (organizationSlug && !organization) {
        return <Navigate to={`/overzicht`} />;
    }

    return <HealthCategoryItems healthCategory={healthCategory} organization={organization} />;
}
