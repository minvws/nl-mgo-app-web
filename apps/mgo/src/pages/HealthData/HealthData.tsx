import { BackButton } from '$/components/BackButton/BackButton';
import { getHealthCategoryBySlug } from '$/healthCategory';
import { useIntl } from '$/intl';
import { useParams } from '$/routing';
import { useResourcesStore } from '$/store';
import { Helmet } from 'react-helmet-async';
import {
    HealthUiSchema,
    type HealthUiSchemaProps,
} from '../../components/HealthUiSchema/HealthUiSchema';
import { NotFound } from '../NotFound/NotFound';

export interface HealthDataProps extends Pick<HealthUiSchemaProps, 'summary'> {}

export function HealthData({ summary }: HealthDataProps) {
    const { formatMessage } = useIntl();
    const params = useParams();
    const { resourceSlug, healthCategorySlug } = params;
    const getResourceBySlug = useResourcesStore((x) => x.getResourceBySlug);
    const healthCategory = getHealthCategoryBySlug(healthCategorySlug!);
    const resource = getResourceBySlug(resourceSlug);

    if (!healthCategory || !resource) {
        return <NotFound className="flex flex-col items-center text-center" />;
    }

    const heading = formatMessage(
        summary ? `hc_${healthCategory}.heading_summary` : `hc_${healthCategory}.heading_detail`
    );

    return (
        <>
            <Helmet title={heading} />

            <section className="flex-grow">
                <BackButton />

                <HealthUiSchema resource={resource} summary={summary} />
            </section>
        </>
    );
}
