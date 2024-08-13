import { useOrganization, useTranslatedDescriptions } from '$/hooks';
import { RouterLink } from '$/routing';
import { type MgoDocumentReference } from '@minvws/mgo-fhir-data';
import { Card } from '@minvws/mgo-mgo-ui';

export interface DocumentsListProps {
    readonly documents: MgoDocumentReference[];
}

export function DocumentsList({ documents }: DocumentsListProps) {
    const { organization } = useOrganization();
    const { results } = useTranslatedDescriptions(documents, ['title', 'author']);

    const items = results.map(({ value, descriptions }) => ({
        id: value.id,
        title: value.title,
        indexed: value.indexed,
        descriptions,
    }));

    return (
        <Card className="p-0">
            {items.map(({ id, title, indexed }) => (
                <RouterLink
                    to={`/overzicht/${organization?.slug}/documenten/4c3da74f-c4e3-4444-9198-44df88872424`}
                    key={id}
                    className="flex justify-between gap-1 border-b border-gray-100 p-4 last:border-b-0 dark:border-gray-700"
                >
                    <div className="flex-grow">
                        <div className="text-md font-bold">{title}</div>
                        <div className="text-md">Ziekenhuis Gelderse Vallei</div>
                    </div>
                    <div className="text-nowrap text-gray-600 dark:text-gray-400">{indexed}</div>
                </RouterLink>
            ))}
        </Card>
    );
}
