import { BackButton } from '$/components/BackButton/BackButton';
import { getHealthCategoryBySlug } from '$/healthCategory';
import { useNavFocusRef } from '$/hooks';
import { Navigate, useParams } from '$/routing';
import { useResourcesStore } from '$/store';
import { Heading } from '@minvws/mgo-mgo-ui';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { UiSchemaDisplay } from '../../components/UiSchemaDisplay/UiSchemaDisplay';

export function HealthDataDetail() {
    const intl = useIntl();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { resourceSlug, organizationSlug, healthCategorySlug } = useParams();
    const getResourceBySlug = useResourcesStore((x) => x.getResourceBySlug);
    const healthCategory = getHealthCategoryBySlug(healthCategorySlug!);

    const resource = getResourceBySlug(resourceSlug);
    const heading = intl.formatMessage({ id: `hc_${healthCategory}.heading_detail` });

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

                <Heading asChild size="lg" className="mb-4 md:mb-8">
                    <h1 ref={navFocusRef}>{heading}</h1>
                </Heading>

                <UiSchemaDisplay
                    uiSchema={resource.uiSchema}
                    dataServiceId={resource.dataServiceId}
                    organizationId={resource.organizationId}
                />
            </section>
        </>
    );
}
