import { useNavFocusRef } from '$/hooks';
import { Trans } from '@lingui/macro';
import { Heading } from '@minvws/mgo-mgo-ui';

export function NotFound() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();

    return (
        <section className="flex-grow">
            <Heading asChild size="lg" className="mb-8">
                <h1 ref={navFocusRef}>
                    <Trans id="healthcare-provider.not-found.heading">
                        Zorgaanbieder was niet gevonden
                    </Trans>
                </h1>
            </Heading>
        </section>
    );
}
