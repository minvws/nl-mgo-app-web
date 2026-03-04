import { useHcim } from '$/hooks';
import { useIntl } from '$/intl';
import { RouterLink } from '$/routing';
import { type Resource } from '$/store';
import { AppMessagesIds } from '@minvws/mgo-intl';
import { DetailButton, ListWrapper, Text, useUniqueId } from '@minvws/mgo-ui';
import { type HTMLAttributes } from 'react';

export interface HealthCategoryDetailListProps extends HTMLAttributes<HTMLElement> {
    readonly heading: AppMessagesIds;
    readonly resources: Resource[];
}

export function HealthSubCategoryList({ heading, resources }: HealthCategoryDetailListProps) {
    const { getCard } = useHcim();
    const subCategoryId = useUniqueId('health-category-sub-list');
    const { formatMessage } = useIntl();

    return (
        <div>
            <Text as="h2" id={subCategoryId} className="mb-2">
                {formatMessage(heading)}
            </Text>

            <ListWrapper aria-labelledby={subCategoryId}>
                {resources.map((resource) => {
                    const { id, slug } = resource;
                    const cardDetails = getCard(resource);
                    return (
                        <li key={id}>
                            <DetailButton
                                title={cardDetails.title}
                                description={cardDetails.description}
                                descriptionIcon={cardDetails.descriptionIcon}
                                detail={cardDetails.detail}
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
