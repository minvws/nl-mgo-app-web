import { bgz } from '$/api/bgz';
import { BackButton } from '$/components/BackButton/BackButton';
import { QueryState } from '$/components/QueryState/QueryState';
import { useNavFocusRef } from '$/hooks';
import { useParams } from '$/routing';
import { useHealthcareOrganizationsStore } from '$/store';
import { Trans, msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { getMgoMedicationStatements } from '@minvws/mgo-fhir-data';
import { Heading, Text } from '@minvws/mgo-mgo-ui';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { MedicationList } from './MedicationList';

export function Medication() {
    const { _ } = useLingui();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { healthcareOrganizationSlug } = useParams();
    const { getHealthcareOrganization } = useHealthcareOrganizationsStore();

    const { display_name: healthcareOrganisationName } = getHealthcareOrganization(
        healthcareOrganizationSlug
    )!;

    const query = useQuery({
        queryKey: ['MedicationStatement', healthcareOrganizationSlug],
        queryFn: async () => {
            const medicationBundle = await bgz.getMedicationUse().json();
            return getMgoMedicationStatements(medicationBundle);
        },
    });

    return (
        <>
            <Helmet
                title={_(
                    msg({
                        id: 'medicine.title',
                        message: `Medicijnen | ${healthcareOrganisationName}`,
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
