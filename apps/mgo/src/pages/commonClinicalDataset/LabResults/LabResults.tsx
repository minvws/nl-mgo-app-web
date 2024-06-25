import { BackButton } from '$/components/BackButton/BackButton';
import { QueryState } from '$/components/QueryState/QueryState';
import { useOrganization, useNavFocusRef } from '$/hooks';
import { Trans, msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { getMgoObservations } from '@minvws/mgo-fhir-data';
import { Heading, Text } from '@minvws/mgo-mgo-ui';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { LabResultsList } from './LabResultsList';
import { assignId } from '$/lib/assignId/assignId';

export function LabResults() {
    const { _ } = useLingui();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { organization, getCommonClinicalDataset } = useOrganization();

    const query = useQuery({
        queryKey: ['LabResults', organization?.slug],
        queryFn: async () => {
            const commonClinicalDataset = getCommonClinicalDataset();
            if (!commonClinicalDataset) {
                return [];
            }

            const observationBundle = await commonClinicalDataset
                .getLastLaboratoryResultsPerType()
                .json();
            return getMgoObservations(observationBundle).map(assignId);
        },
    });

    return (
        <>
            <Helmet
                title={
                    _(
                        msg({
                            id: 'lab_results.heading',
                            message: `Uitslagen`,
                        })
                    ) + ` | ${organization?.name}`
                }
            />
            <section className="flex-grow">
                <BackButton />

                <Heading asChild size="lg" className="mb-4">
                    <h1 ref={navFocusRef}>
                        <Trans id="lab_results.heading">Uitslagen</Trans>
                    </h1>
                </Heading>

                <Text size="lg" className="text-sm">
                    <Trans id="lab_results.subheading">
                        Resultaten van jouw onderzoeken, (r&ouml;ntgen)foto&apos;s en scans.
                    </Trans>
                </Text>

                <div className="py-6 md:py-10">
                    <QueryState
                        {...query}
                        useCardWrapper
                        renderResult={({ data }) => <LabResultsList observations={data} />}
                    />
                </div>
            </section>
        </>
    );
}
