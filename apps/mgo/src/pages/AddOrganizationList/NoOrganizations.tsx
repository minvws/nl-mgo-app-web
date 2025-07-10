import { QueryStateLayout } from '$/components/QueryStateLayout/QueryStateLayout';
import { FormattedMessage, useIntl } from '$/intl';
import { RouterLink } from '$/routing';
import { Button, Card, Stack } from '@minvws/mgo-ui';

export function NoOrganizations() {
    const { formatMessage } = useIntl();
    return (
        <Stack className="my-6 flex-grow gap-12">
            <Card className="mt-6">
                <QueryStateLayout
                    illustration="woman-on-couch"
                    title={formatMessage('add_organization_list.no_results_heading')}
                >
                    <FormattedMessage
                        id="add_organization_list.no_results_subheading"
                        description="Je hebt nog geen zorgaanbieders toegevoegd aan deze lijst. Je kunt dit nu
                        doen, of later via je profiel."
                    />
                </QueryStateLayout>
            </Card>
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-6">
                <Button asChild>
                    <RouterLink to="/zorgaanbieder-toevoegen">
                        <FormattedMessage
                            id="add_organization_list.add_organization"
                            description="Voeg een zorgaanbieder toe"
                        />
                    </RouterLink>
                </Button>
                <Button variant="light" asChild>
                    <RouterLink to="/overzicht">
                        <FormattedMessage
                            id="add_organization_list.to_overview"
                            description="Ga naar het overzicht"
                        />
                    </RouterLink>
                </Button>
            </div>
        </Stack>
    );
}
