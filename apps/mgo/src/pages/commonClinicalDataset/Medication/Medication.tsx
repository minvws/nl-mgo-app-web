import { BackButton } from '$/components/BackButton/BackButton';
import { QueryState } from '$/components/QueryState/QueryState';
import { useHealthcareOrganization, useNavFocusRef } from '$/hooks/index.ts';
import { Trans, msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { getMgoMedicationStatements } from '@minvws/mgo-fhir-data';
import { Heading, Text } from '@minvws/mgo-mgo-ui';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { MedicationList } from './MedicationList';
import { assignId } from '$/lib/assignId/assignId';

export function Medication() {
    const { _ } = useLingui();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { organization, getCommonClinicalDataset } = useHealthcareOrganization();

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
                title={_(
                    msg({
                        id: 'medicine.title',
                        message: `Medicijnen | ${organization?.name}`,
                    })
                )}
            />
            <section className="flex-grow">
                <BackButton />

                <Heading asChild size="lg" className="mb-4">
                    <h1 ref={navFocusRef}>
                        <Trans id="medicine.heading">Medicijnen</Trans>
                    </h1>
                </Heading>

                <Text size="lg" className="text-sm">
                    <Trans id="medicine.description">
                        Een overzicht van de medicijnen die zijn voorgeschreven door je
                        zorgaanbieder.
                    </Trans>
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
