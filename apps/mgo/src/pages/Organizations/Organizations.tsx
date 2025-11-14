import { NoOrganizations } from '$/components/NoOrganizations/NoOrganizations';
import { useNavFocusRef } from '$/hooks';
import { FormattedMessage, useIntl } from '$/intl';
import { RouterLink } from '$/routing';
import { useStore } from '$/store';
import { Button, ButtonCard, Heading, Stack } from '@minvws/mgo-ui';

export function Organizations() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const organizations = useStore.use.organizations();
    const { formatMessage } = useIntl();

    return (
        <>
            <Heading asChild size="xl">
                <h1 ref={navFocusRef}>
                    <FormattedMessage id="organizations.heading" />
                </h1>
            </Heading>

            {organizations.length ? (
                <>
                    <Stack asChild className="-mx-4 my-6 gap-1 sm:mx-0 sm:gap-2 md:my-12">
                        <ul>
                            {organizations.map(({ slug, name, category }) => (
                                <li key={slug}>
                                    <ButtonCard
                                        asChild
                                        title={name ?? formatMessage('common.unknown')}
                                        description={category}
                                    >
                                        <RouterLink to={`/zorgaanbieders/${slug}`} />
                                    </ButtonCard>
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
