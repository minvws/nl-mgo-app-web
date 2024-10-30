import { BackButton } from '$/components/BackButton/BackButton';
import { QueryState } from '$/components/QueryState/QueryState';
import { useNavFocusRef, useOrganization } from '$/hooks';
import { assignId } from '$/lib/assignId/assignId';
import { getMgoProblems } from '@minvws/mgo-fhir-data';
import { Heading, Text } from '@minvws/mgo-mgo-ui';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';
import { ProblemsList } from './ProblemsList';

export function Problems() {
    const intl = useIntl();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { organization, getCommonClinicalDatasetService } = useOrganization();

    const query = useQuery({
        queryKey: ['Problems', organization?.slug],
        queryFn: async () => {
            const commonClinicalDataset = getCommonClinicalDatasetService();
            if (!commonClinicalDataset) {
                return [];
            }

            const problemBundle = await commonClinicalDataset.getProblems().json();
            return getMgoProblems(problemBundle).map(assignId);
        },
    });

    return (
        <>
            <Helmet
                title={intl.formatMessage({ id: 'problems.heading' }) + ` | ${organization?.name}`}
            />

            <section className="flex-grow">
                <BackButton />

                <Heading asChild size="lg" className="mb-4">
                    <h1 ref={navFocusRef}>
                        <FormattedMessage
                            id="problems.heading"
                            description="Klachten en diagnoses"
                        />
                    </h1>
                </Heading>

                <Text size="lg" variant="light" className="text-sm">
                    <FormattedMessage
                        id="problems.subheading"
                        description="Je diagnoses en gezondheidsklachten, vastgesteld door je zorgaanbieder."
                    />
                </Text>

                <div className="py-6 md:py-10">
                    <QueryState
                        {...query}
                        useCardWrapper
                        renderResult={({ data }) => <ProblemsList conditions={data} />}
                    />
                </div>
            </section>
        </>
    );
}
