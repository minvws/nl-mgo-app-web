import { NoOrganizations } from '$/components/NoOrganizations/NoOrganizations';
import { FormattedMessage, useIntl } from '$/intl';
import { RouterLink } from '$/routing';
import { useStore } from '$/store';
import { Button, Heading, OrganizationButton, Stack } from '@minvws/mgo-ui';

export function Organizations() {
    const organizations = useStore.use.organizations();
    const { formatMessage } = useIntl();

    return (
        <>
            <Heading as="h1" focusOnRender size="xl">
                <FormattedMessage id="organizations.heading" />
            </Heading>

            {organizations.length ? (
                <>
                    <Stack asChild className="-mx-4 my-6 gap-1 sm:mx-0 sm:gap-2 md:my-12">
                        <ul>
                            {organizations.map(({ slug, name, category }) => (
                                <li key={slug}>
                                    <OrganizationButton
                                        asChild
                                        title={name ?? formatMessage('common.unknown')}
                                        subTitle={category}
                                    >
                                        <RouterLink to={`/zorgaanbieders/${slug}`} />
                                    </OrganizationButton>
                                </li>
                            ))}
                        </ul>
                    </Stack>

                    <Button asChild className="self-start">
                        <RouterLink to="/zorgaanbieder-toevoegen">
                            <FormattedMessage
                                id="common.add_organizations"
                                description="Voeg zorgaanbieders toe"
                            />
                        </RouterLink>
                    </Button>
                </>
            ) : (
                <NoOrganizations />
            )}
        </>
    );
}
