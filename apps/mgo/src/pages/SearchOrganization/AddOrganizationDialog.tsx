import { useLogger } from '$/hooks';
import { useIntl } from '$/intl';
import { useNavigate } from '$/routing';
import { useStore } from '$/store';
import { type SearchResult } from '@minvws/mgo-org-search';
import { ConfirmDialog } from '@minvws/mgo-ui';
import { type RefObject } from 'react';

interface AddOrganizationDialogProps {
    readonly isOpen: boolean;
    readonly setIsOpen: (isOpen: boolean) => void;
    readonly selectedSearchResult: SearchResult | null;
    readonly dataServiceEndpoints: Record<string, string>;
    readonly confirmDialogTriggerRef: RefObject<HTMLButtonElement | null>;
}

export const AddOrganizationDialog = ({
    isOpen,
    setIsOpen,
    selectedSearchResult,
    dataServiceEndpoints,
    confirmDialogTriggerRef,
}: AddOrganizationDialogProps) => {
    const { formatMessage } = useIntl();
    const { log } = useLogger();
    const navigate = useNavigate();
    const addOrganization = useStore.use.addOrganization();

    const resolveEndpoint = (key: string) => {
        if (!dataServiceEndpoints[key]) {
            log.error(`Data service endpoint for key "${key}" not found in dataServiceEndpoints`);
            return 'data-service-endpoint-not-found';
        }
        return dataServiceEndpoints[key];
    };

    const addSelectedOrganization = () => {
        const organization = selectedSearchResult?.document;

        if (!organization) {
            log.error(
                'Attempted to add organization without a selected search result (organization'
            );
            return;
        }

        const { dataServices, ...rest } = selectedSearchResult.document;

        if (!dataServices?.length) {
            log.error('Attempted to add organization without data services');
            return;
        }

        /**
         * The organization dataServices only contain endpoint *keys/aliases* (e.g. "resourceEndpoint": "12").
         * Before persisting the selected organization we replace those aliases with the actual URLs
         * using `dataServiceEndpoints`, so the stored organization data service contains the actual URL values.
         */
        const organizationToAdd = {
            ...rest,
            dataServices: dataServices?.map((dataService) => ({
                ...dataService,
                resourceEndpoint: resolveEndpoint(dataService.resourceEndpoint),
                authEndpoint: resolveEndpoint(dataService.authEndpoint),
                tokenEndpoint: resolveEndpoint(dataService.tokenEndpoint),
            })),
        };
        addOrganization(organizationToAdd);
        navigate('/zorgaanbieders');
    };

    return (
        <ConfirmDialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <ConfirmDialog.Content
                title={formatMessage('dialog.add_organization_heading', {
                    organizationName: selectedSearchResult?.document.name,
                })}
                description={formatMessage('dialog.add_organization_subheading')}
                confirmButtonText={formatMessage('dialog.add_organization_yes')}
                cancelButtonText={formatMessage('dialog.add_organization_no')}
                closeButtonAriaLabel={formatMessage('common.voice_over_close')}
                onConfirm={addSelectedOrganization}
                onCloseAutoFocus={() => confirmDialogTriggerRef.current?.focus()}
            />
        </ConfirmDialog.Root>
    );
};
