import { type HealthCategory } from '$/healthCategory';
import { FormattedMessage } from '$/intl';
import { RouterLink } from '$/routing';
import { useOrganizationsStore, type Resource } from '$/store';
import { type AppMessagesIds } from '@minvws/mgo-mgo-intl';
import { DetailButton, ListWrapper, Text } from '@minvws/mgo-mgo-ui';
import { type HTMLAttributes } from 'react';

export interface HealthCategoryDetailListProps extends HTMLAttributes<HTMLElement> {
    readonly category: HealthCategory;
    readonly heading: string;
    readonly resources: Resource[];
}

export function HealthCategoryDetailList({
    category,
    heading,
    resources,
}: HealthCategoryDetailListProps) {
    const organisationStore = useOrganizationsStore();

    return (
        <div>
            <Text asChild>
                <h2 className="mb-2">
                    <FormattedMessage
                        id={`health_category.${category}.${heading}` as AppMessagesIds}
                    />
                </h2>
            </Text>

            <ListWrapper>
                {resources.map(({ id, slug, label, organizationId }) => {
                    const organization = organisationStore.getOrganizationById(organizationId);
                    return (
                        <DetailButton
                            key={id}
                            title={label}
                            description={organization?.name}
                            asChild
                        >
                            <RouterLink to={`./${slug}`} />
                        </DetailButton>
                    );
                })}
            </ListWrapper>
        </div>
    );
}
