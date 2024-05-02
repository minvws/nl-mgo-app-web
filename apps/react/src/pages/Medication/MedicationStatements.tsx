import { Trans } from '@lingui/macro';
import { type LosslessFhirResource } from '@minvws/mgo-fhir-client';
import { getDosageDescription, getMedicationName } from '@minvws/mgo-fhir-data';
import { Accordion, Record, Stack } from '@minvws/mgo-react-ui';

export interface MedicationStatementsProps {
    statements: LosslessFhirResource<'MedicationStatement'>[];
}

export function MedicationStatements({ statements }: MedicationStatementsProps) {
    return (
        <Stack asChild className="mt-6">
            <ul>
                {statements.map((statement, i) => (
                    <li key={i}>
                        <Accordion defaultExpanded={i === 0}>
                            <Accordion.Button>{getMedicationName(statement)}</Accordion.Button>

                            <Accordion.Panel>
                                <Stack>
                                    <Record>
                                        <Record.Label>
                                            <Trans id="medicine.dosage">Dosering</Trans>
                                        </Record.Label>
                                        <Record.Description>
                                            {getDosageDescription(statement)}
                                        </Record.Description>
                                    </Record>

                                    <Record>
                                        <Record.Label>
                                            <Trans id="medicine.start-date">Startdatum</Trans>
                                        </Record.Label>
                                        <Record.Date
                                            value={statement?.effectivePeriod?.start || ''}
                                        />
                                    </Record>
                                </Stack>
                            </Accordion.Panel>
                        </Accordion>
                    </li>
                ))}
            </ul>
        </Stack>
    );
}
