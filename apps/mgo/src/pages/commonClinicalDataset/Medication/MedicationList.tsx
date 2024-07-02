import { DescriptionListAccordions } from '$/components/DescriptionListAccordions/DescriptionListAccordions';
import { useTranslatedDescriptions } from '$/hooks';
import { type WithId } from '$/lib/assignId/assignId';
import { type MgoMedicationStatement } from '@minvws/mgo-fhir-data';

export interface MedicationListProps {
    readonly statements: WithId<MgoMedicationStatement>[];
}

export function MedicationList({ statements }: MedicationListProps) {
    const { results } = useTranslatedDescriptions(statements, [
        'instructions',
        'startDate',
        'prescribedBy',
    ]);

    const items = results.map(({ value, descriptions }) => ({
        id: value.id,
        title: value.title,
        descriptions,
    }));

    return <DescriptionListAccordions items={items} />;
}
