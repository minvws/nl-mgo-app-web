import { QueryStateLayout } from '$/components/QueryStateLayout/QueryStateLayout';
import { RouterLink } from '$/routing';
import { Button, Card, Stack } from '@minvws/mgo-mgo-ui';
import { FormattedMessage, useIntl } from 'react-intl';

export function NoOrganizations() {
    const intl = useIntl();
    return (
        <Stack className="my-6 flex-grow gap-12">
            <Card className="mt-6">
                <QueryStateLayout
                    illustration="woman-on-couch"
                    title={intl.formatMessage({ id: 'organization_list.no_results_heading' })}
                >
                    <FormattedMessage
                        id="organization_list.no_results_subheading"
                        description="Je hebt nog geen zorgaanbieders toegevoegd aan deze lijst. Je kunt dit nu
                        doen, of later via je profiel."
                    />
                </QueryStateLayout>
            </Card>
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-6">
                <Button asChild>
                    <RouterLink to="/zorgaanbieder-toevoegen">
                        <FormattedMessage
                            id="organization_list.add_organization"
                            description="Voeg een zorgaanbieder toe"
                        />
                    </RouterLink>
                </Button>
                <Button variant="light" asChild>
                    <RouterLink to="/overzicht">
                        <FormattedMessage
                            id="organization_list.to_overview"
                            description="Ga naar het overzicht"
                        />
                    </RouterLink>
                </Button>
            </div>
        </Stack>
    );
}
