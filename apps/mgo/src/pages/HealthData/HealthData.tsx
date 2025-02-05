import { BackButton } from '$/components/BackButton/BackButton';
import { getHealthCategoryBySlug } from '$/healthCategory';
import { Navigate, useParams } from '$/routing';
import { useResourcesStore } from '$/store';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { UiSchema } from '../../components/UiSchema/UiSchema';

export interface HealthDataProps {
    readonly showDetails?: boolean;
}

export function HealthData({ showDetails }: HealthDataProps) {
    const intl = useIntl();
    const { resourceSlug, organizationSlug, healthCategorySlug } = useParams();
    const getResourceBySlug = useResourcesStore((x) => x.getResourceBySlug);
    const healthCategory = getHealthCategoryBySlug(healthCategorySlug!);
    const resource = getResourceBySlug(resourceSlug);

    const heading = intl.formatMessage({
        id: showDetails
            ? `hc_${healthCategory}.heading_detail`
            : `hc_${healthCategory}.heading_summary`,
    });

    if (!resource) {
        return organizationSlug ? (
            <Navigate to={`/organisaties/${organizationSlug}/${healthCategorySlug}`} />
        ) : (
            <Navigate to={`/overzicht/${healthCategorySlug}`} />
        );
    }

    return (
        <>
            <Helmet title={heading} />

            <section className="flex-grow">
                <BackButton />

                <UiSchema resource={resource} showDetails={showDetails} />
            </section>
        </>
    );
}
