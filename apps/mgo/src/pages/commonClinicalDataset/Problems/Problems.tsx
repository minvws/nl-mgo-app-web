import { BackButton } from '$/components/BackButton/BackButton';
import { QueryState } from '$/components/QueryState/QueryState';
import { useOrganization, useNavFocusRef } from '$/hooks';
import { Trans, msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { getMgoProblems } from '@minvws/mgo-fhir-data';
import { Heading, Text } from '@minvws/mgo-mgo-ui';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { ProblemsList } from './ProblemsList';
import { assignId } from '$/lib/assignId/assignId';

export function Problems() {
    const { _ } = useLingui();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { organization, getCommonClinicalDataset } = useOrganization();

    const query = useQuery({
        queryKey: ['Problems', organization?.slug],
        queryFn: async () => {
            const commonClinicalDataset = getCommonClinicalDataset();
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
                title={
                    _(
                        msg({
                            id: 'problems.heading',
                            message: `Klachten en diagnoses`,
                        })
                    ) + ` | ${organization?.name}`
                }
            />

            <section className="flex-grow">
                <BackButton />

                <Heading asChild size="lg" className="mb-4">
                    <h1 ref={navFocusRef}>
                        <Trans id="problems.heading">Klachten en diagnoses</Trans>
                    </h1>
                </Heading>

                <Text size="lg" className="text-sm">
                    <Trans id="problems.subheading">
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
            </section>
        </>
    );
}
