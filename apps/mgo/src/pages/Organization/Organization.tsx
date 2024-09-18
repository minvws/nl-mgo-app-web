import { BackButton } from '$/components/BackButton/BackButton';
import { useNavFocusRef, useOrganization } from '$/hooks';
import { RouterLink } from '$/routing';
import { ListWrapper, Heading, Stack, CategoryButton } from '@minvws/mgo-mgo-ui';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';
import { NotFound } from './NotFound';
import { HealthCategory, healthCategorySlugs, useHealthCategoryQuery } from '$/healthCategory';
import { useCallback, useEffect } from 'react';

export function Organization() {
    const { organization } = useOrganization();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const intl = useIntl();

    const { isLoading: personalInformationIsLoading } = useHealthCategoryQuery(HealthCategory.PersonalInformation, [
        organization?.id,
    ]);

    const { isLoading: payerIsLoading } = useHealthCategoryQuery(HealthCategory.Payer, [
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
                    {/* TODO: make seperate component */}
                    <ListWrapper gap="line">
                        <CategoryButton
                            asChild
                            loadingText="Laden"
                            isLoading={personalInformationIsLoading}
                        >
                            <RouterLink
                                to={`/overzicht/${organization.slug}/${healthCategorySlugs[HealthCategory.PersonalInformation]}`}
                            >
                                <FormattedMessage id="organization.personal_information_heading" />
                            </RouterLink>
                        </CategoryButton>
                        <CategoryButton
                            asChild
                            loadingText="Laden"
                            isLoading={payerIsLoading}
                        >
                            <RouterLink
                                to={`/overzicht/${organization.slug}/${healthCategorySlugs[HealthCategory.Payer]}`}
                            >
                                <FormattedMessage id="organization.payer_heading" />
                            </RouterLink>
                        </CategoryButton>
                    </ListWrapper>
                </Stack>
            </section>
        </>
    );
}
