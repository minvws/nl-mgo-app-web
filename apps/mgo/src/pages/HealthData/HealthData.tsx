import { Breadcrumbs } from '$/components/Breadcrumbs/Breadcrumbs';
import { useIntl } from '$/intl';
import { useParamsData } from '$/routing';
import { Helmet } from 'react-helmet-async';
import {
    HealthUiSchema,
    type HealthUiSchemaProps,
} from '../../components/HealthUiSchema/HealthUiSchema';
import { NotFound } from '../NotFound/NotFound';

export type HealthDataProps = Pick<HealthUiSchemaProps, 'summary'>;

export function HealthData({ summary }: Readonly<HealthDataProps>) {
    const { formatMessage } = useIntl();
    const { healthCategory, resource } = useParamsData();

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
                <Breadcrumbs />
                <HealthUiSchema resource={resource} summary={summary} />
            </section>
        </>
    );
}
