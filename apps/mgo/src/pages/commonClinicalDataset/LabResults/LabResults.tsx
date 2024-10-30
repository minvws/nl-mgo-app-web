import { BackButton } from '$/components/BackButton/BackButton';
import { QueryState } from '$/components/QueryState/QueryState';
import { useNavFocusRef, useOrganization } from '$/hooks';
import { assignId } from '$/lib/assignId/assignId';
import { getMgoObservations } from '@minvws/mgo-fhir-data';
import { Heading, Text } from '@minvws/mgo-mgo-ui';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';
import { LabResultsList } from './LabResultsList';

export function LabResults() {
    const intl = useIntl();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { organization, getCommonClinicalDatasetService } = useOrganization();

    const query = useQuery({
        queryKey: ['LabResults', organization?.slug],
        queryFn: async () => {
            const commonClinicalDataset = getCommonClinicalDatasetService();
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
                    intl.formatMessage({ id: 'lab_results.heading' }) + ` | ${organization?.name}`
                }
            />
            <section className="flex-grow">
                <BackButton />

                <Heading asChild size="lg" className="mb-4">
                    <h1 ref={navFocusRef}>
                        <FormattedMessage id="lab_results.heading" description="Uitslagen" />
                    </h1>
                </Heading>

                <Text size="lg" variant="light" className="text-sm">
                    <FormattedMessage
                        id="lab_results.subheading"
                        description="Resultaten van jouw onderzoeken, (r&ouml;ntgen)foto's en scans."
                    />
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
