import { BackButton } from '$/components/BackButton/BackButton';
import { getHealthCategoryBySlug } from '$/healthCategory';
import { useIntl } from '$/intl';
import { Navigate, useParams } from '$/routing';
import { useResourcesStore } from '$/store';
import { Helmet } from 'react-helmet-async';
import { HealthUiSchema } from '../../components/HealthUiSchema/HealthUiSchema';
import { NotFound } from '../NotFound/NotFound';

export interface HealthDataProps {
    readonly showDetails?: boolean;
}

export function HealthData({ showDetails }: HealthDataProps) {
    const { formatMessage } = useIntl();
    const { resourceSlug, organizationSlug, healthCategorySlug } = useParams();
    const getResourceBySlug = useResourcesStore((x) => x.getResourceBySlug);
    const healthCategory = getHealthCategoryBySlug(healthCategorySlug!);
    const resource = getResourceBySlug(resourceSlug);

    if (!healthCategory) {
        return <NotFound className="flex flex-col items-center text-center" />;
    }

    if (!resource) {
        return organizationSlug ? (
            <Navigate to={`/organisaties/${organizationSlug}/${healthCategorySlug}`} />
        ) : (
            <Navigate to={`/overzicht/${healthCategorySlug}`} />
        );
    }

    const heading = formatMessage(
        showDetails ? `hc_${healthCategory}.heading_detail` : `hc_${healthCategory}.heading_summary`
    );

    return (
        <>
            <Helmet title={heading} />

            <section className="flex-grow">
                <BackButton />

                <HealthUiSchema resource={resource} showDetails={showDetails} />
            </section>
        </>
    );
}
