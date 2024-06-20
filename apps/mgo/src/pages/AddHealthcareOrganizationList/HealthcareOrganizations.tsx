import { RouterLink } from '$/routing';
import { useHealthcareOrganizationsStore } from '$/store/healthcareOrganizations';
import { Trans, msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import {
    Button,
    ConfirmDialog,
    HealthcareOrganizationButton,
    Stack,
    useOpenState,
} from '@minvws/mgo-mgo-ui';
import { useState } from 'react';

export function HealthcareOrganizations() {
    const { _ } = useLingui();
    const { organizations, getOrganizationBySlug, removeOrganizationBySlug } =
        useHealthcareOrganizationsStore();

    const [selectedSlug, setSelectedSlug] = useState<string>();
    const { isOpen, open, setIsOpen } = useOpenState({
        afterClose: () => {
            setSelectedSlug(undefined);
        },
    });

    return (
        <Stack className="my-6 flex-grow gap-12">
            {selectedSlug && (
                <ConfirmDialog
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    title={_(
                        msg({
                            id: 'healthcare-organizations.dialog.title',
                            message: `${getOrganizationBySlug(selectedSlug)?.name} weglaten?`,
                        })
                    )}
                    description={_(
                        msg({
                            id: 'healthcare-organizations.dialog.description',
                            message:
                                'We halen je dossier van deze zorgaanbieder niet op. Je kunt deze later alsnog toevoegen via je profiel.',
                        })
                    )}
                    confirmButtonText={_(
                        msg({
                            id: 'healthcare-organizations.dialog.confirmButton',
                            message: 'Ja, weglaten',
                        })
                    )}
                    cancelButtonText={_(
                        msg({
                            id: 'healthcare-organizations.dialog.cancelButton',
                            message: 'Nee, toch tonen',
                        })
                    )}
                    closeButtonAriaLabel={_(msg({ id: 'common.close', message: 'Sluiten' }))}
                    onConfirm={() => removeOrganizationBySlug(selectedSlug)}
                />
            )}
            <p className="text-md">
                <Trans id="healthcare-organizations.description">
                    Je kunt deze lijst nu aanpassen of dit later in je profiel doen.
                </Trans>
            </p>
            <Stack asChild className="gap-2 sm:gap-4">
                <ul>
                    {organizations.map(({ slug, name, category, address }) => (
                        <li key={slug}>
                            <HealthcareOrganizationButton
                                onClick={() => {
                                    setSelectedSlug(slug);
                                    open();
                                }}
                                className="w-full"
                                title={category}
                                subTitle={name}
                                meta={<span className="whitespace-pre">{address}</span>}
                                icon="delete"
                                iconAriaLabel={_(
                                    msg({
                                        id: 'healthcare-organizations.delete',
                                        message: 'verwijderen',
                                    })
                                )}
                            />
                        </li>
                    ))}
                </ul>
            </Stack>
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-6">
                <Button asChild>
                    <RouterLink to="/overzicht">
                        <Trans id="healthcare-organizations.done">Ga naar het overzicht</Trans>
                    </RouterLink>
                </Button>
                <Button variant="light" asChild>
                    <RouterLink to="/zorgaanbieder-toevoegen">
                        <Trans id="healthcare-organizations.add">Voeg een zorgaanbieder toe</Trans>
                    </RouterLink>
                </Button>
            </div>
        </Stack>
    );
}
