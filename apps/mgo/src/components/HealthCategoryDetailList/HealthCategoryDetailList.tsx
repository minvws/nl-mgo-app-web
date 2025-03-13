import { RouterLink } from '$/routing';
import { useOrganizationsStore, type Resource } from '$/store';
import { DetailButton, ListWrapper, Text } from '@minvws/mgo-mgo-ui';
import { type HTMLAttributes } from 'react';

export interface HealthCategoryDetailListProps extends HTMLAttributes<HTMLElement> {
    readonly heading: string;
    readonly resources: Resource[];
}

export function HealthCategoryDetailList({ heading, resources }: HealthCategoryDetailListProps) {
    const organisationStore = useOrganizationsStore();

    return (
        <div>
            <Text asChild>
                <h2 className="mb-2">{heading}</h2>
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
