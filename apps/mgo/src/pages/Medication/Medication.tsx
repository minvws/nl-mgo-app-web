import { bgz } from '$/api/bgz';
import { BackButton } from '$/components/BackButton/BackButton';
import { QueryState } from '$/components/QueryState/QueryState';
import { useNavFocusRef } from '$/hooks';
import { Trans, msg } from '@lingui/macro';
import { getMgoMedicationStatements } from '@minvws/mgo-fhir-data';
import { Container, Heading, Text } from '@minvws/mgo-mgo-ui';
import { useQuery } from '@tanstack/react-query';
import { MedicationList } from './MedicationList';
import { Helmet } from 'react-helmet';
import { useLingui } from '@lingui/react';
import { useHealthcareOrganizationsStore } from '$/store';
import { useParams } from '$/routing';

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
            <Container>
                <BackButton to=".." relative="path" />

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
            </Container>
        </>
    );
}
