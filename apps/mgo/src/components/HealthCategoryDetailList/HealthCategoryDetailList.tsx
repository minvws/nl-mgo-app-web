import { RouterLink } from '$/routing';
import { useOrganizationsStore, type Resource } from '$/store';
import { DetailButton, ListWrapper, Text, useUniqueId } from '@minvws/mgo-mgo-ui';
import { type HTMLAttributes } from 'react';

export interface HealthCategoryDetailListProps extends HTMLAttributes<HTMLElement> {
    readonly heading: string;
    readonly resources: Resource[];
}

export function HealthCategoryDetailList({ heading, resources }: HealthCategoryDetailListProps) {
    const organisationStore = useOrganizationsStore();
    const subCategoryId = useUniqueId('health-category-sub-list');

    return (
        <div>
            <Text asChild id={subCategoryId}>
                <h2 className="mb-2">{heading}</h2>
            </Text>

            <ListWrapper aria-labelledby={subCategoryId}>
                {resources.map(({ id, slug, label, organizationId }) => {
                    const organization = organisationStore.getOrganizationById(organizationId);
                    return (
                        <li key={id}>
                            <DetailButton title={label} description={organization?.name} asChild>
                                <RouterLink to={`./${slug}`} />
                            </DetailButton>
                        </li>
                    );
                })}
            </ListWrapper>
        </div>
    );
}
