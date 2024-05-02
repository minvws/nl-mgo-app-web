import { BackButton } from '$/components/BackButton/BackButton';
import { QueryState } from '$/components/QueryState/QueryState';
import { getResources } from '$/fhir/client';
import { useNavFocusRef } from '$/hooks';
import { Trans } from '@lingui/macro';
import { getBundleResources } from '@minvws/mgo-fhir-data';
import { Container, Heading } from '@minvws/mgo-react-ui';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { MedicationStatements } from './MedicationStatements';

export function Medication() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { healthcareProviderSlug } = useParams();

    const query = useQuery({
        queryKey: ['MedicationStatement', healthcareProviderSlug],
        queryFn: async () => {
            const medicationBundle = await getResources(
                {
                    resource: 'MedicationStatement',
                },
                {
                    searchParams: {
                        category: 'urn:oid:2.16.840.1.113883.2.4.3.11.60.20.77.5.3|6',
                        _include: 'MedicationStatement:medication',
                    },
                }
            ).json();

            return getBundleResources(medicationBundle);
        },
    });

    return (
        <Container>
            <BackButton to=".." relative="path" />

            <Heading asChild size="lg" className="mb-8">
                <h1 ref={navFocusRef}>
                    <Trans id="medicine.title">Medicijnen</Trans>
                </h1>
            </Heading>
            <Trans id="medicine.description">
                Een overzicht van de medicijnen die zijn voorgeschreven door je zorgaanbieder.
            </Trans>

            <QueryState
                {...query}
                renderResult={({ data }) => <MedicationStatements statements={data} />}
            />
        </Container>
    );
}
