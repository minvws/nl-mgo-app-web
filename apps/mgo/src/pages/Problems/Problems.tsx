import { BackButton } from '$/components/BackButton/BackButton';
import { QueryState } from '$/components/QueryState/QueryState';
import { useNavFocusRef } from '$/hooks';
import { Trans } from '@lingui/macro';
import { Container, Heading, Text } from '@minvws/mgo-mgo-ui';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { bgz } from '$/api/bgz';
import { getMgoProblems } from '@minvws/mgo-fhir-data';
import { ProblemsList } from './ProblemsList';

export function Problems() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { healthcareProviderSlug } = useParams();

    const query = useQuery({
        queryKey: ['Problems', healthcareProviderSlug],
        queryFn: async () => {
            const problemBundle = await bgz.getProblems().json();
            return getMgoProblems(problemBundle);
        },
    });

    return (
        <Container>
            <BackButton to=".." relative="path" />

            <Heading asChild size="lg" className="mb-4">
                <h1 ref={navFocusRef}>
                    <Trans id="problems.title">Klachten en diagnoses</Trans>
                </h1>
            </Heading>

            <Text size="lg" className="text-sm">
                <Trans id="problems.description">
                    Je diagnoses en gezondheidsklachten, vastgesteld door je zorgaanbieder.
                </Trans>
            </Text>

            <div className="py-6 md:py-10">
                <QueryState
                    {...query}
                    useCardWrapper
                    renderResult={({ data }) => <ProblemsList conditions={data} />}
                />
            </div>
        </Container>
    );
}
