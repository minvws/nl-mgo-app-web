import { BackButton } from '$/components/BackButton/BackButton';
import { QueryState } from '$/components/QueryState/QueryState';
import { useHealthcareOrganization, useNavFocusRef } from '$/hooks';
import { Trans, msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { getMgoObservations } from '@minvws/mgo-fhir-data';
import { Heading, Text } from '@minvws/mgo-mgo-ui';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { LaboratoryResultsList } from './LaboratoryResultsList';

export function LaboratoryResults() {
    const { _ } = useLingui();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { organization, getCommonClinicalDataset } = useHealthcareOrganization();

    const query = useQuery({
        queryKey: ['LaboratoryResults', organization?.slug],
        queryFn: async () => {
            const commonClinicalDataset = getCommonClinicalDataset();
            if (!commonClinicalDataset) {
                return [];
            }

            const observationBundle = await commonClinicalDataset
                .getLastLaboratoryResultsPerType()
                .json();
            return getMgoObservations(observationBundle);
        },
    });

    return (
        <>
            <Helmet
                title={_(
                    msg({
                        id: 'laboratory-results.title',
                        message: `Uitslagen | ${organization?.name}`,
                    })
                )}
            />
            <section className="flex-grow">
                <BackButton />

                <Heading asChild size="lg" className="mb-4">
                    <h1 ref={navFocusRef}>
                        <Trans id="laboratory-results.heading">Uitslagen</Trans>
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
            </section>
        </>
    );
}
