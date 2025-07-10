import { Navigate, useParamsData } from '$/routing';
import { NotFound } from '../NotFound/NotFound';
import { HealthCategoryItems } from './HealthCategoryItems';

export function HealthCategory() {
    const { organizationSlug, organization, healthCategory } = useParamsData();

    if (!healthCategory) {
        return <NotFound className="flex flex-col items-center text-center" />;
    }

    if (organizationSlug && !organization) {
        return <Navigate to={`/overzicht`} />;
    }

    return <HealthCategoryItems healthCategory={healthCategory} organization={organization} />;
}
