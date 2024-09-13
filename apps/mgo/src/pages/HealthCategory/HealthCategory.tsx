import { BackButton } from '$/components/BackButton/BackButton';
import { LoadingSpinner } from '$/components/LoadingSpinner/LoadingSpinner';
import { getHealthCategoryBySlug, useHealthCategoryQuery } from '$/healthCategory';
import { useNavFocusRef } from '$/hooks/index.ts';
import { Navigate, useParams } from '$/routing';
import { useOrganizationsStore } from '$/store';
import { Heading } from '@minvws/mgo-mgo-ui';
import { Helmet } from 'react-helmet-async';
import { useIntl, FormattedMessage } from 'react-intl';
import { categoryContent, type HealthCategoryContentComponent } from './categoryContent';

export function HealthCategory() {
    const intl = useIntl();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { healthCategorySlug, organizationSlug } = useParams();
    const { getOrganizationBySlug } = useOrganizationsStore();

    const healthCategory = getHealthCategoryBySlug(healthCategorySlug!);
    const organization = getOrganizationBySlug(organizationSlug);

    const { isLoading, data } = useHealthCategoryQuery(healthCategory, [organization?.id]);
    const heading = intl.formatMessage({ id: `health_category.${healthCategory}` });

    const CategoryContent = categoryContent[healthCategory] as HealthCategoryContentComponent<
        typeof healthCategory
    > | null;

    if (!CategoryContent || !organization) {
        return <Navigate to={`/overzicht`} />;
    }

    return (
        <>
            <Helmet title={heading} />

            <section className="flex-grow">
                <BackButton />

                <Heading asChild size="lg">
                    <h1 ref={navFocusRef}>{heading}</h1>
                </Heading>

                <div className="py-4 md:py-8">
                    {isLoading ? (
                        <div className="py-8 text-center md:py-16">
                            <LoadingSpinner>
                                <FormattedMessage id="common.loading" />
                            </LoadingSpinner>
                        </div>
                    ) : (
                        <CategoryContent data={data} />
                    )}
                </div>
            </section>
        </>
    );
}
