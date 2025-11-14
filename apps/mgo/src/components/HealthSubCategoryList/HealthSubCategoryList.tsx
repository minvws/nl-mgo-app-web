import { useHealthUiSchema } from '$/hooks';
import { useIntl } from '$/intl';
import { RouterLink } from '$/routing';
import { useStore, type Resource } from '$/store';
import { AppMessagesIds } from '@minvws/mgo-intl';
import { DetailButton, ListWrapper, Text, useUniqueId } from '@minvws/mgo-ui';
import { type HTMLAttributes } from 'react';

export interface HealthCategoryDetailListProps extends HTMLAttributes<HTMLElement> {
    readonly heading: AppMessagesIds;
    readonly resources: Resource[];
}

export function HealthSubCategoryList({ heading, resources }: HealthCategoryDetailListProps) {
    const getOrganizationById = useStore.use.getOrganizationById();
    const { getSummary } = useHealthUiSchema();
    const subCategoryId = useUniqueId('health-category-sub-list');
    const { formatMessage } = useIntl();

    return (
        <div>
            <Text as="h2" id={subCategoryId} className="mb-2">
                {formatMessage(heading)}
            </Text>

            <ListWrapper aria-labelledby={subCategoryId}>
                {resources.map((resource) => {
                    const { id, slug, source } = resource;
                    const organization = getOrganizationById(source.organizationId);
                    const summary = getSummary(resource);
                    return (
                        <li key={id}>
                            <DetailButton
                                title={summary.label}
                                description={organization?.name}
                                asChild
                            >
                                <RouterLink to={`./${slug}`} />
                            </DetailButton>
                        </li>
                    );
                })}
            </ListWrapper>
        </div>
    );
}
