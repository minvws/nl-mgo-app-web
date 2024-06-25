import { RouterLink } from '$/routing';
import { useOrganizationsStore } from '$/store/organizations';
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

export function Organizations() {
    const { _ } = useLingui();
    const { organizations, getOrganizationBySlug, removeOrganizationBySlug } =
        useOrganizationsStore();
    const [selectedSlug, setSelectedSlug] = useState<string>();
    const { isOpen, open, setIsOpen } = useOpenState({
        afterClose: () => {
            setSelectedSlug(undefined);
        },
    });

    const selectedOrganizationName = getOrganizationBySlug(selectedSlug)?.name;

    return (
        <Stack className="my-6 flex-grow gap-12">
            {selectedSlug && (
                <ConfirmDialog
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    title={_(
                        msg({
                            id: 'dialog.remove_organization_heading',
                            message: `${selectedOrganizationName} weglaten?`,
                        })
                    )}
                    description={_(
                        msg({
                            id: 'dialog.remove_organization_subheading',
                            message:
                                'We halen je dossier van deze zorgaanbieder niet op. Je kunt deze later alsnog toevoegen via je profiel.',
                        })
                    )}
                    confirmButtonText={_(
                        msg({
                            id: 'dialog.remove_organization_yes',
                            message: 'Ja, weglaten',
                        })
                    )}
                    cancelButtonText={_(
                        msg({
                            id: 'dialog.remove_organization_no',
                            message: 'Nee, toch tonen',
                        })
                    )}
                    closeButtonAriaLabel={_(
                        msg({ id: 'common.voice_over_close', message: 'Sluiten' })
                    )}
                    onConfirm={() => removeOrganizationBySlug(selectedSlug)}
                />
            )}

            <p className="text-md">
                <Trans id="organization_list.subheading">
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
                                        id: 'common.delete',
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
                        <Trans id="organization_list.to_overview">Ga naar het overzicht</Trans>
                    </RouterLink>
                </Button>
                <Button variant="light" asChild>
                    <RouterLink to="/zorgaanbieder-toevoegen">
                        <Trans id="organization_list.add_organization">
                            Voeg een zorgaanbieder toe
                        </Trans>
                    </RouterLink>
                </Button>
            </div>
        </Stack>
    );
}
