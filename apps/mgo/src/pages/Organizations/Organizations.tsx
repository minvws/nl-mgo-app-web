import { NoOrganizations } from '$/components/NoOrganizations/NoOrganizations';
import { useNavFocusRef } from '$/hooks';
import { FormattedMessage, useIntl } from '$/intl';
import { RouterLink } from '$/routing';
import { useOrganizationsStore } from '$/store';
import { Button, ButtonCard, Heading, Stack } from '@minvws/mgo-mgo-ui';

export function Organizations() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();

    const { organizations } = useOrganizationsStore();
    const { formatMessage } = useIntl();

    return (
        <>
            <Heading asChild size="lg" className="mb-2 md:mb-4">
                <h1 ref={navFocusRef}>
                    <FormattedMessage id="organizations.heading" description="Goedemorgen" />
                </h1>
            </Heading>

            {organizations.length ? (
                <>
                    <p className="sm:text-md text-sm text-gray-700 md:text-lg lg:text-xl dark:text-white">
                        <FormattedMessage id="organizations.heading" description="Zorgaanbieders" />
                    </p>

                    <Stack asChild className="-mx-4 my-6 gap-1 sm:mx-0 sm:gap-2 md:my-12">
                        <ul>
                            {organizations.map(({ slug, name, category }) => (
                                <li key={slug}>
                                    <ButtonCard
                                        asChild
                                        title={name ?? formatMessage('common.unknown')}
                                        description={category}
                                    >
                                        <RouterLink to={`/organisaties/${slug}`} />
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
