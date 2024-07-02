import { DescriptionListAccordions } from '$/components/DescriptionListAccordions/DescriptionListAccordions';
import { useTranslatedDescriptions } from '$/hooks';
import { type WithId } from '$/lib/assignId/assignId';
import { type MgoObservation } from '@minvws/mgo-fhir-data';

export interface LabResultsListProps {
    readonly observations: WithId<MgoObservation>[];
}

export function LabResultsList({ observations }: LabResultsListProps) {
    const { results } = useTranslatedDescriptions(observations, [
        'code',
        'dateTime',
        'result',
        'status',
        'referenceRangeLow',
        'referenceRangeHigh',
        'interpretation',
        'collectionDateTime',
        'specimen',
    ]);

    const items = results.map(({ value, descriptions }) => ({
        id: value.id,
        title: value.title,
        descriptions,
    }));

    return <DescriptionListAccordions items={items} />;
}
