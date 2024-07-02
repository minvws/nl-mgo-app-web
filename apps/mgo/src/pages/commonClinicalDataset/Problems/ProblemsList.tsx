import { DescriptionListAccordions } from '$/components/DescriptionListAccordions/DescriptionListAccordions';
import { useTranslatedDescriptions } from '$/hooks';
import { type WithId } from '$/lib/assignId/assignId';
import { type MgoProblem } from '@minvws/mgo-fhir-data';

export interface ProblemsListProps {
    readonly conditions: WithId<MgoProblem>[];
}

export function ProblemsList({ conditions }: ProblemsListProps) {
    const { results } = useTranslatedDescriptions(conditions, [
        'clinicalStatus',
        'category',
        'startDate',
        'endDate',
        'bodyLocation',
        'comment',
    ]);

    const items = results.map(({ value, descriptions }) => ({
        id: value.id,
        title: value.title,
        descriptions,
    }));

    return <DescriptionListAccordions items={items} />;
}
