import { Trans } from '@lingui/macro';
import { Heading, Stack } from '@minvws/mgo-react-ui';

export function NotFound() {
    return (
        <section className="mx-auto max-w-sm">
            <Heading asChild size="lg" className="my-10 text-center">
                <h1>
                    <Trans id="not-found.heading">Pagina niet gevonden</Trans>
                </h1>
            </Heading>
            <Stack className="text-center">
                <p>
                    <Trans id="not-found.description">
                        Veritatis culpa vero eligendi reiciendis numquam natus nisi mollitia beatae
                        maiores aperiam in dignissimos. Eum non neque possimus non minus adipisci
                        quis quo quibusdam consectetur labore impedit maxime praesentium.
                    </Trans>
                </p>
            </Stack>
        </section>
    );
}
