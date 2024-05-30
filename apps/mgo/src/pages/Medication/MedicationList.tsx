import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { type MgoMedicationStatement } from '@minvws/mgo-fhir-data';
import { Accordion, DescriptionList, Stack } from '@minvws/mgo-mgo-ui';

export interface MedicationListProps {
    statements: MgoMedicationStatement[];
}

function getDescriptions({ instructions, prescribedBy, startDate }: MgoMedicationStatement) {
    return [
        {
            term: msg({
                id: 'medicine.instructions',
                message: 'Dosering',
            }),
            details: instructions,
        },
        {
            term: msg({
                id: 'medicine.startDate',
                message: 'Startdatum',
            }),
            details: startDate,
        },
        {
            term: msg({
                id: 'medicine.prescribedBy',
                message: 'Voorgeschreven door',
            }),
            details: prescribedBy,
        },
    ];
}

export function MedicationList({ statements }: MedicationListProps) {
    const { _ } = useLingui();

    return (
        <Stack asChild>
            <ul>
                {statements.map((statement, i) => (
                    <li key={i}>
                        <Accordion defaultExpanded={i === 0}>
                            <h2>
                                <Accordion.Button>{statement.title}</Accordion.Button>
                            </h2>

                            <Accordion.Panel>
                                <DescriptionList
                                    list={getDescriptions(statement).map(({ term, details }) => ({
                                        term: _(term),
                                        details,
                                    }))}
                                />
                            </Accordion.Panel>
                        </Accordion>
                    </li>
                ))}
            </ul>
        </Stack>
    );
}
