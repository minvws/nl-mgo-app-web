import { useParams, type RoutePath } from '$/routing';
import { type Resource } from '$/store';

export function useResourceRoutePath(resource: Resource | undefined): RoutePath {
    const { organizationSlug, healthCategorySlug } = useParams();
    const { slug: resourceSlug } = resource ?? { slug: undefined };

    if (organizationSlug) {
        return `/zorgaanbieders/${organizationSlug}/${healthCategorySlug}/${resourceSlug}/detail`;
    }

    return `/overzicht/${healthCategorySlug}/${resourceSlug}/detail`;
}
