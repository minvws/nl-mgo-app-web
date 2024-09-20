import { type HealthCategory } from '$/healthCategory';
import { RouterLink } from '$/routing';
import { useOrganizationsStore, type Resource } from '$/store';
import { DetailButton, ListWrapper, Text } from '@minvws/mgo-mgo-ui';
import { type HTMLAttributes } from 'react';
import { FormattedMessage } from 'react-intl';

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
                    <FormattedMessage id={`health_category.${category}.${heading}`} />
                </h2>
            </Text>

            <ListWrapper>
                {resources.map(({ id, slug, uiSchema, organizationId }) => {
                    const organization = organisationStore.getOrganizationById(organizationId);
                    return (
                        <DetailButton
                            key={id}
                            title={uiSchema.label}
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
