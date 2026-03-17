import { dataServiceConfigs } from '$/config';
import { useIntl } from '$/intl';
import { useStore } from '$/store';
import { SearchResult } from '@minvws/mgo-org-search';
import { OrganizationButton } from '@minvws/mgo-ui';
import { RefObject, type HTMLAttributes } from 'react';
import { hasIntersection } from '../../../../../packages/utils/src/hasIntersection/hasIntersection';

const supportedDataServiceIds = dataServiceConfigs.map((x) => x.id);

interface ResultsListItemProps extends HTMLAttributes<HTMLElement> {
    readonly searchResult: SearchResult;
    readonly onClick: () => void;
    readonly ref?: RefObject<HTMLButtonElement | null>;
}

export const ResultsListItem = ({ searchResult, ref, onClick }: ResultsListItemProps) => {
    const { formatMessage } = useIntl();
    const hasOrganizationById = useStore.use.hasOrganizationById();

    const { name, address, city } = searchResult.document;
    const title = name ?? formatMessage('common.unknown');
    const subTitle = `${address} ${city}`;
    const isAdded = hasOrganizationById(searchResult.document.id);
    const isSupported = hasIntersection(
        supportedDataServiceIds,
        searchResult.document.dataServices?.map((x) => x.id) || []
    );

    if (isAdded) {
        return (
            <OrganizationButton
                disabled
                title={title}
                subTitle={subTitle}
                successMessage={formatMessage('add_organization.already_added')}
            />
        );
    }

    if (isSupported) {
        return <OrganizationButton onClick={onClick} title={title} subTitle={subTitle} ref={ref} />;
    }

    return (
        <OrganizationButton
            disabled
            title={title}
            subTitle={subTitle}
            infoMessage={formatMessage('add_organization.not_participating')}
        />
    );
};
