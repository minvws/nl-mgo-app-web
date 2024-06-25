import { useTranslateDescriptions } from '$/hooks/useTranslateDescriptions/useTranslateDescriptions';
import { type WithId } from '$/lib/assignId/assignId';
import { msg } from '@lingui/macro';
import { type MgoMedicationStatement } from '@minvws/mgo-fhir-data';
import { Accordion, DescriptionList, Stack } from '@minvws/mgo-mgo-ui';

export interface MedicationListProps {
    readonly statements: WithId<MgoMedicationStatement>[];
}

function getDescriptions({ instructions, prescribedBy, startDate }: MgoMedicationStatement) {
    return [
        {
            term: msg({
                id: 'fhir.instructions',
                message: 'Dosering',
            }),
            details: instructions,
        },
        {
            term: msg({
                id: 'fhir.startDate',
                message: 'Startdatum',
            }),
            details: startDate,
        },
        {
            term: msg({
                id: 'fhir.prescribedBy',
                message: 'Voorgeschreven door',
            }),
            details: prescribedBy,
        },
    ];
}

export function MedicationList({ statements }: MedicationListProps) {
    const { translateDescriptions } = useTranslateDescriptions();

    return (
        <Stack asChild>
            <ul>
                {statements.map((statement, i) => (
                    <li key={statement.id}>
                        <Accordion defaultExpanded={i === 0}>
                            <h2>
                                <Accordion.Button>{statement.title}</Accordion.Button>
                            </h2>

                            <Accordion.Panel>
                                <DescriptionList
                                    list={translateDescriptions(getDescriptions(statement))}
                                />
                            </Accordion.Panel>
                        </Accordion>
                    </li>
                ))}
            </ul>
        </Stack>
    );
}
