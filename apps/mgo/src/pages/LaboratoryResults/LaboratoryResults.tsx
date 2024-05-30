import { bgz } from '$/api/bgz';
import { BackButton } from '$/components/BackButton/BackButton';
import { QueryState } from '$/components/QueryState/QueryState';
import { useNavFocusRef } from '$/hooks';
import { Trans } from '@lingui/macro';
import { getMgoObservations } from '@minvws/mgo-fhir-data';
import { Container, Heading, Text } from '@minvws/mgo-mgo-ui';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { LaboratoryResultsList } from './LaboratoryResultsList';

export function LaboratoryResults() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { healthcareProviderSlug } = useParams();

    const query = useQuery({
        queryKey: ['LaboratoryResults', healthcareProviderSlug],
        queryFn: async () => {
            const observationBundle = await bgz.getLastLaboratoryResultsPerType().json();
            return getMgoObservations(observationBundle);
        },
    });

    return (
        <Container>
            <BackButton to=".." relative="path" />

            <Heading asChild size="lg" className="mb-4">
                <h1 ref={navFocusRef}>
                    <Trans id="laboratory-results.title">Uitslagen</Trans>
                </h1>
            </Heading>

            <Text size="lg" className="text-sm">
                <Trans id="laboratory-results.description">
                    Resultaten van jouw onderzoeken, (r&ouml;ntgen)foto&apos;s en scans.
                </Trans>
            </Text>

            <div className="py-6 md:py-10">
                <QueryState
                    {...query}
                    useCardWrapper
                    renderResult={({ data }) => <LaboratoryResultsList observations={data} />}
                />
            </div>
        </Container>
    );
}
