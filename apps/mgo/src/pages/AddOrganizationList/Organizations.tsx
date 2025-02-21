import { FormattedMessage, useIntl } from '$/intl';
import { RouterLink } from '$/routing';
import { useOrganizationsStore } from '$/store';
import {
    Button,
    ConfirmDialog,
    HealthcareOrganizationCard,
    Stack,
    useOpenState,
} from '@minvws/mgo-mgo-ui';
import { useState } from 'react';

export function Organizations() {
    const { formatMessage } = useIntl();
    const { organizations, getOrganizationBySlug, removeOrganizationBySlug } =
        useOrganizationsStore();
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
        <Stack className="my-6 flex-grow gap-12">
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

            <p className="text-md">
                <FormattedMessage
                    id="add_organization_list.subheading"
                    description="Je kunt zelf zorgaanbieders toevoegen of verwijderen. Dit kun je ook later in je profiel doen."
                />
            </p>
            <Stack asChild className="gap-2 sm:gap-4">
                <ul>
                    {organizations.map(({ slug, name, category, address }) => (
                        <li key={slug}>
                            <HealthcareOrganizationCard
                                onActionClick={() => {
                                    setSelectedSlug(slug);
                                    open();
                                }}
                                className="w-full"
                                title={category}
                                subTitle={name}
                                meta={<span className="whitespace-pre">{address}</span>}
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
                <Button variant="light" asChild>
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
