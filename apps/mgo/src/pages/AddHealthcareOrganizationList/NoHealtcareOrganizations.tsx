import { QueryStateLayout } from '$/components/QueryStateLayout/QueryStateLayout';
import { RouterLink } from '$/routing';
import { Trans, msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Button, Card, Stack } from '@minvws/mgo-mgo-ui';

export function NoHealthcareOrganizations() {
    const { _ } = useLingui();
    return (
        <Stack className="my-6 flex-grow gap-12">
            <Card className="mt-6">
                <QueryStateLayout
                    illustration="woman-on-couch"
                    title={_(
                        msg({
                            id: 'healthcare-organisation.no-results.title',
                            message: `Deze lijst is nog leeg`,
                        })
                    )}
                >
                    <Trans id="healthcare-organisation.no-results.description">
                        Je hebt nog geen zorgaanbieders toegevoegd aan deze lijst. Je kunt dit nu
                        doen, of later via je profiel.
                    </Trans>
                </QueryStateLayout>
            </Card>
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-6">
                <Button asChild>
                    <RouterLink to="/zorgaanbieder-toevoegen">
                        <Trans id="healthcare-organisations.add">Voeg een zorgaanbieder toe</Trans>
                    </RouterLink>
                </Button>
                <Button variant="light" asChild>
                    <RouterLink to="/overzicht">
                        <Trans id="healthcare-organisations.done">Ga naar het overzicht</Trans>
                    </RouterLink>
                </Button>
            </div>
        </Stack>
    );
}
