import { FormattedMessage } from '$/intl';
import { RouterLink } from '$/routing';
import { Button, Heading, Illustration, Stack, Text } from '@minvws/mgo-ui';

export const NoOrganizations = () => (
    <Stack className="mx-auto max-w-sm flex-col items-center gap-0 text-center">
        <Illustration
            illustration="woman-with-phone"
            className="mb-8 w-full max-w-[156px] md:max-w-[200px]"
        />
        <Heading className="mb-2" as="h2">
            <FormattedMessage
                id="common.no_organizations_heading"
                description="Je hebt nog geen zorgaanbieders toegevoegd"
            />
        </Heading>
        <Text className="mb-8">
            <FormattedMessage
                id="common.no_organizations_subheading"
                description="Voeg zorgaanbieders toe om gegevens over je gezondheid te zien."
            />
        </Text>
        <Button asChild className="mb-6 md:mb-12">
            <RouterLink to="/zorgaanbieder-toevoegen">
                <FormattedMessage
                    id="common.add_organizations"
                    description="Voeg zorgaanbieders toe"
                />
            </RouterLink>
        </Button>
    </Stack>
);
