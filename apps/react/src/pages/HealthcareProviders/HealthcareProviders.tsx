import { useNavFocusRef } from '$/hooks';
import { Trans } from '@lingui/macro';
import { Heading, Stack } from '@minvws/mgo-react-ui';

export function HealthcareProviders() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();

    return (
        <section className="flex-grow">
            <Heading asChild size="lg" className="mb-8">
                <h2 ref={navFocusRef}>
                    <Trans id="healthcare-providers.heading">Zorgverleners</Trans>
                </h2>
            </Heading>
            <Stack>
                <p>
                    <Trans id="healthcare-providers.description.p1">
                        Veritatis culpa vero eligendi reiciendis numquam natus nisi mollitia beatae
                        maiores aperiam in dignissimos. Eum non neque possimus non minus adipisci
                        quis quo quibusdam consectetur labore impedit maxime praesentium.
                    </Trans>
                </p>
                <p>
                    <Trans id="healthcare-providers.description.p2">
                        Ipsa beatae molestiae quidem sapiente recusandae illo dolorum dolor itaque
                        impedit culpa fugiat explicabo. Eum mollitia pariatur perspiciatis adipisci
                        eaque consectetur laboriosam culpa ab accusamus blanditiis consequuntur sunt
                        ducimus. Itaque nostrum exercitationem numquam occaecati sapiente laudantium
                        explicabo nesciunt ex exercitationem. Accusantium porro soluta amet unde eos
                        quod rem at. Laudantium eligendi facere tempora corrupti iure facere libero
                        porro tempore.
                    </Trans>
                </p>
            </Stack>
        </section>
    );
}
