import { Link } from '$/routing';
import { useHealthcareOrganizationsStore } from '$/store/healthcareProviders';
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
    const { healthcareOrganizations, getHealthcareOrganization, removeHealthcareOrganization } =
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
                            id: 'healthcare-providers.dialog.title',
                            message: `${getHealthcareOrganization(selectedSlug)?.display_name} weglaten?`,
                        })
                    )}
                    description={_(
                        msg({
                            id: 'healthcare-providers.dialog.description',
                            message:
                                'We halen je dossier van deze zorgaanbieder niet op. Je kunt deze later alsnog toevoegen via je profiel.',
                        })
                    )}
                    confirmButtonText={_(
                        msg({
                            id: 'healthcare-providers.dialog.confirmButton',
                            message: 'Ja, weglaten',
                        })
                    )}
                    cancelButtonText={_(
                        msg({
                            id: 'healthcare-providers.dialog.cancelButton',
                            message: 'Nee, toch tonen',
                        })
                    )}
                    closeButtonAriaLabel={_(msg({ id: 'common.close', message: 'Sluiten' }))}
                    onConfirm={() => removeHealthcareOrganization(selectedSlug)}
                />
            )}
            <p className="text-md">
                <Trans id="healthcare-providers.description">
                    Je kunt deze lijst nu aanpassen of dit later in je profiel doen.
                </Trans>
            </p>
            <Stack asChild className="gap-2 sm:gap-4">
                <ul>
                    {healthcareOrganizations.map(({ slug, display_name, types, addresses }) => (
                        <li key={slug}>
                            <HealthcareOrganizationButton
                                onClick={() => {
                                    setSelectedSlug(slug);
                                    open();
                                }}
                                className="w-full"
                                title={types[0].display_name}
                                subTitle={display_name}
                                meta={
                                    <span className="whitespace-pre">{addresses[0].address}</span>
                                }
                                icon="delete"
                                iconAriaLabel={_(
                                    msg({
                                        id: 'healthcare-providers.delete',
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
                    <Link to="/overzicht">
                        <Trans id="healthcare-providers.done">Ga naar het overzicht</Trans>
                    </Link>
                </Button>
                <Button variant="light" asChild>
                    <Link to="/zorgaanbieder-toevoegen">
                        <Trans id="healthcare-providers.add">Voeg een zorgaanbieder toe</Trans>
                    </Link>
                </Button>
            </div>
        </Stack>
    );
}
