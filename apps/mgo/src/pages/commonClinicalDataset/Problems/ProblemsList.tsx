import { useTranslateDescriptions } from '$/hooks/useTranslateDescriptions/useTranslateDescriptions';
import { type WithId } from '$/lib/assignId/assignId';
import { msg } from '@lingui/macro';
import { type MgoProblem } from '@minvws/mgo-fhir-data';
import { Accordion, DescriptionList, Stack } from '@minvws/mgo-mgo-ui';

export interface ProblemsListProps {
    readonly conditions: WithId<MgoProblem>[];
}

function getDescriptions({
    clinicalStatus,
    category,
    startDate,
    endDate,
    bodyLocation,
    comment,
}: MgoProblem) {
    return [
        {
            term: msg({
                id: 'problems.clinicalStatus',
                message: 'Status',
            }),
            details: clinicalStatus,
        },
        {
            term: msg({
                id: 'problems.category',
                message: 'Categorie',
            }),
            details: category,
        },
        {
            term: msg({
                id: 'problems.startDate',
                message: 'Startdatum',
            }),
            details: startDate,
        },
        {
            term: msg({
                id: 'problems.endDate',
                message: 'Einddatum',
            }),
            details: endDate,
        },
        {
            term: msg({
                id: 'problems.bodySite',
                message: 'Anatomische locatie',
            }),
            details: bodyLocation,
        },
        {
            term: msg({
                id: 'problems.commment',
                message: 'Notitie',
            }),
            details: comment,
        },
    ];
}

export function ProblemsList({ conditions }: ProblemsListProps) {
    const { translateDescriptions } = useTranslateDescriptions();

    return (
        <Stack asChild>
            <ul>
                {conditions.map((condition, i) => (
                    <li key={condition.id}>
                        <Accordion defaultExpanded={i === 0}>
                            <h2>
                                <Accordion.Button>{condition.title}</Accordion.Button>
                            </h2>

                            <Accordion.Panel>
                                <DescriptionList
                                    list={translateDescriptions(getDescriptions(condition))}
                                />
                            </Accordion.Panel>
                        </Accordion>
                    </li>
                ))}
            </ul>
        </Stack>
    );
}
