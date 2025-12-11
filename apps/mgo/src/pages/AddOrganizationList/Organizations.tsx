import { FormattedMessage, useIntl } from '$/intl';
import { RouterLink } from '$/routing';
import { useStore } from '$/store';
import {
    Button,
    ConfirmDialog,
    HealthcareOrganizationCard,
    Stack,
    Text,
    useOpenState,
} from '@minvws/mgo-ui';
import { useState } from 'react';

export function Organizations() {
    const { formatMessage } = useIntl();
    const organizations = useStore.use.organizations();
    const getOrganizationBySlug = useStore.use.getOrganizationBySlug();
    const removeOrganizationBySlug = useStore.use.removeOrganizationBySlug();
    const [selectedSlug, setSelectedSlug] = useState<string>();
    const { isOpen, open, setIsOpen } = useOpenState({
        afterClose: () => {
            setSelectedSlug(undefined);
        },
    });

    const i18nValues = {
        organizationName: getOrganizationBySlug(selectedSlug)?.name,
    };

    return (
        <Stack className="my-6 grow gap-12">
            {selectedSlug && (
                <ConfirmDialog
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    title={formatMessage('dialog.remove_organization_heading', i18nValues)}
                    description={formatMessage('dialog.remove_organization_subheading', i18nValues)}
                    confirmButtonText={formatMessage('dialog.remove_organization_yes')}
                    cancelButtonText={formatMessage('dialog.remove_organization_no')}
                    closeButtonAriaLabel={formatMessage('common.voice_over_close')}
                    onConfirm={() => removeOrganizationBySlug(selectedSlug)}
                />
            )}

            <Text as="p">
                <FormattedMessage
                    id="add_organization_list.subheading"
                    description="Je kunt zelf zorgaanbieders toevoegen of verwijderen. Dit kun je ook later in je profiel doen."
                />
            </Text>

            <Stack asChild className="gap-2 sm:gap-4">
                <ul>
                    {organizations.map(({ slug, name, category, address }) => (
                        <li key={slug} data-testid={'organization-item'}>
                            <HealthcareOrganizationCard
                                onActionClick={() => {
                                    setSelectedSlug(slug);
                                    open();
                                }}
                                className="w-full"
                                title={category}
                                subTitle={name}
                                meta={address}
                                icon="delete"
                                iconAriaLabel={formatMessage('common.delete')}
                            />
                        </li>
                    ))}
                </ul>
            </Stack>

            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-6">
                <Button asChild>
                    <RouterLink to="/overzicht">
                        <FormattedMessage
                            id="add_organization_list.to_overview"
                            description="Ga naar het overzicht"
                        />
                    </RouterLink>
                </Button>
                <Button variant="outline" asChild>
                    <RouterLink to="/zorgaanbieder-toevoegen">
                        <FormattedMessage
                            id="add_organization_list.add_organization"
                            description="Voeg een zorgaanbieder toe"
                        />
                    </RouterLink>
                </Button>
            </div>
        </Stack>
    );
}
