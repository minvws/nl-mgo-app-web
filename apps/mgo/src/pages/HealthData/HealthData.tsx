import { Breadcrumbs } from '$/components/Breadcrumbs/Breadcrumbs';
import { useHealthUiSchema } from '$/hooks';
import { useIntl } from '$/intl';
import { useParamsData } from '$/routing';
import { AppMessagesIds } from '@minvws/mgo-intl';
import { Helmet } from 'react-helmet-async';
import { HealthUiSchema } from '../../components/HealthUiSchema/HealthUiSchema';
import { NotFound } from '../NotFound/NotFound';

export type HealthDataProps = {
    summary?: boolean;
};

export function HealthData({ summary }: Readonly<HealthDataProps>) {
    const { formatMessage } = useIntl();
    const { healthCategory, resource } = useParamsData();
    const { getSummary, getDetails } = useHealthUiSchema();

    if (!healthCategory || !resource) {
        return <NotFound className="flex flex-col items-center text-center" />;
    }

    const heading = formatMessage(healthCategory.heading as AppMessagesIds);
    const schema = summary ? getSummary(resource) : getDetails(resource);

    return (
        <>
            <Helmet title={heading} />

            <section className="grow">
                <Breadcrumbs />
                <HealthUiSchema resource={resource} schema={schema} />
            </section>
        </>
    );
}
