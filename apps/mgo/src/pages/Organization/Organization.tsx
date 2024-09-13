import { BackButton } from '$/components/BackButton/BackButton';
import { useNavFocusRef, useOrganization } from '$/hooks';
import { RouterLink } from '$/routing';
import { ListWrapper, Heading, Stack, CategoryButton } from '@minvws/mgo-mgo-ui';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';
import { NotFound } from './NotFound';
import { HealthCategory, healthCategorySlugs, useHealthCategoryQuery } from '$/healthCategory';

export function Organization() {
    const { organization } = useOrganization();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const intl = useIntl();

    const { isLoading: medicationIsLoading } = useHealthCategoryQuery(HealthCategory.Medication, [
        organization?.id,
    ]);

    const i18nValues = {
        organizationName: organization?.name,
        organizationCategory: organization?.category,
    };

    if (!organization) {
        return <NotFound />;
    }

    return (
        <>
            <Helmet title={intl.formatMessage({ id: 'organization.title' })} />

            <section className="flex-grow">
                <div>
                    <BackButton />
                </div>

                <Heading asChild size="lg" className="mb-4 md:mb-8">
                    <h1 ref={navFocusRef}>
                        <FormattedMessage
                            id="organization.heading"
                            description="{organizationName}"
                            values={i18nValues}
                        />
                    </h1>
                </Heading>

                <Stack className="mb-6 gap-6 md:mb-12">
                    <ListWrapper gap="line">
                        <CategoryButton
                            icon="pill"
                            asChild
                            loadingText="Laden"
                            isLoading={medicationIsLoading}
                        >
                            <RouterLink
                                to={`/overzicht/${organization.slug}/${healthCategorySlugs[HealthCategory.Medication]}`}
                            >
                                <FormattedMessage id="organization.medicine_heading" />
                            </RouterLink>
                        </CategoryButton>

                        <CategoryButton icon="diagnosis" asChild>
                            <RouterLink to={`/overzicht/${organization.slug}/klachten`}>
                                <FormattedMessage id="organization.diagnosis_heading" />
                            </RouterLink>
                        </CategoryButton>

                        <CategoryButton icon="labs" asChild>
                            <RouterLink to={`/overzicht/${organization.slug}/uitslagen`}>
                                <FormattedMessage id="organization.lab_results_heading" />
                            </RouterLink>
                        </CategoryButton>

                        <CategoryButton icon="folder" asChild>
                            <RouterLink to={`/overzicht/${organization.slug}/documenten`}>
                                <FormattedMessage id="organization.documents_heading" />
                            </RouterLink>
                        </CategoryButton>
                    </ListWrapper>
                </Stack>
            </section>
        </>
    );
}
