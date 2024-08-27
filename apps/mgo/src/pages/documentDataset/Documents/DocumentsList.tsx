import { useOrganization, useTranslatedDescriptions } from '$/hooks';
import { RouterLink } from '$/routing';
import { type MgoDocumentReference } from '@minvws/mgo-fhir-data';
import { DetailList } from '@minvws/mgo-mgo-ui';

export interface DocumentsListProps {
    readonly documents: MgoDocumentReference[];
}

export function DocumentsList({ documents }: DocumentsListProps) {
    const { organization } = useOrganization();
    const { results } = useTranslatedDescriptions(documents, ['title', 'author']);

    const items = results.map(({ value }) => ({
        id: value.id,
        title: value.title,
        indexed: value.indexed,
    }));

    return (
        <DetailList gap="line">
            {items.map(({ id, title, indexed }) => (
                <DetailList.Button
                    title={title}
                    description={organization?.name}
                    date={indexed}
                    icon="chevron-right"
                    className="items-start"
                    asChild
                    key={id}
                >
                    <RouterLink
                        to={`/overzicht/${organization?.slug}/documenten/4c3da74f-c4e3-4444-9198-44df88872424`}
                    />
                </DetailList.Button>
            ))}
        </DetailList>
    );
}
