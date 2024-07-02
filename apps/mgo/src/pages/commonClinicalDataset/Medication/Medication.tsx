import { BackButton } from '$/components/BackButton/BackButton';
import { QueryState } from '$/components/QueryState/QueryState';
import { useNavFocusRef, useOrganization } from '$/hooks/index.ts';
import { assignId } from '$/lib/assignId/assignId';
import { getMgoMedicationStatements } from '@minvws/mgo-fhir-data';
import { Heading, Text } from '@minvws/mgo-mgo-ui';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';
import { MedicationList } from './MedicationList';

export function Medication() {
    const intl = useIntl();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { organization, getCommonClinicalDataset } = useOrganization();

    const query = useQuery({
        queryKey: ['MedicationStatement', organization?.slug],
        queryFn: async () => {
            const commonClinicalDataset = getCommonClinicalDataset();
            if (!commonClinicalDataset) {
                return [];
            }

            const medicationBundle = await commonClinicalDataset.getMedicationUse().json();
            return getMgoMedicationStatements(medicationBundle).map(assignId);
        },
    });

    return (
        <>
            <Helmet
                title={
                    intl.formatMessage({ id: 'medication_use.heading' }) +
                    ` | ${organization?.name}`
                }
            />
            <section className="flex-grow">
                <BackButton />

                <Heading asChild size="lg" className="mb-4">
                    <h1 ref={navFocusRef}>
                        <FormattedMessage id="medication_use.heading" description="Medicijnen" />
                    </h1>
                </Heading>

                <Text size="lg" className="text-sm">
                    <FormattedMessage
                        id="medication_use.subheading"
                        description="Een overzicht van de medicijnen die zijn voorgeschreven door je
                        zorgaanbieder."
                    />
                </Text>

                <div className="py-6 md:py-10">
                    <QueryState
                        {...query}
                        useCardWrapper
                        renderResult={({ data }) => <MedicationList statements={data} />}
                    />
                </div>
            </section>
        </>
    );
}
