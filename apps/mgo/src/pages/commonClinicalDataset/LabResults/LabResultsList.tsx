import { useTranslateDescriptions } from '$/hooks/useTranslateDescriptions/useTranslateDescriptions';
import { type WithId } from '$/lib/assignId/assignId';
import { msg } from '@lingui/macro';
import { type MgoObservation } from '@minvws/mgo-fhir-data';
import { Accordion, DescriptionList, Stack } from '@minvws/mgo-mgo-ui';

export interface LabResultsListProps {
    readonly observations: WithId<MgoObservation>[];
}

function getDescriptions({
    code,
    status,
    dateTime,
    result,
    referenceRangeLow,
    referenceRangeHigh,
    interpretation,
    specimen,
    collectionDateTime,
}: MgoObservation) {
    return [
        {
            term: msg({
                id: 'fhir.code',
                message: 'Testcode',
            }),
            details: code,
        },
        {
            term: msg({
                id: 'fhir.dateTime',
                message: 'Testdatum',
            }),
            details: dateTime,
        },
        {
            term: msg({
                id: 'fhir.result',
                message: 'Testuitslag',
            }),
            details: result,
        },
        {
            term: msg({
                id: 'fhir.status',
                message: 'Test status',
            }),
            details: status,
        },
        {
            term: msg({
                id: 'fhir.referenceRangeHigh',
                message: 'Referentie bovengrens',
            }),
            details: referenceRangeHigh,
        },
        {
            term: msg({
                id: 'fhir.referenceRangeLow',
                message: 'Referentie ondergrens',
            }),
            details: referenceRangeLow,
        },
        {
            term: msg({
                id: 'fhir.interpretation',
                message: 'Interpretatie vlaggen',
            }),
            details: interpretation,
        },
        {
            term: msg({
                id: 'fhir.specimen',
                message: 'Monstermateriaal',
            }),
            details: specimen,
        },
        {
            term: msg({
                id: 'fhir.collectionDateTime',
                message: 'Afnamedatum',
            }),
            details: collectionDateTime,
        },
    ];
}

export function LabResultsList({ observations }: LabResultsListProps) {
    const { translateDescriptions } = useTranslateDescriptions();

    return (
        <Stack asChild>
            <ul>
                {observations.map((observation, i) => (
                    <li key={observation.id}>
                        <Accordion defaultExpanded={i === 0}>
                            <h2>
                                <Accordion.Button>{observation.title}</Accordion.Button>
                            </h2>

                            <Accordion.Panel>
                                <DescriptionList
                                    list={translateDescriptions(getDescriptions(observation))}
                                />
                            </Accordion.Panel>
                        </Accordion>
                    </li>
                ))}
            </ul>
        </Stack>
    );
}
