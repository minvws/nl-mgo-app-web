import { AllOrNone } from '@minvws/mgo-utils';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { type UIEvent } from 'react';
import { Button, ButtonLoadingProps } from '../Button/Button';
import { Heading } from '../Heading/Heading';
import { IconButton } from '../IconButton/IconButton';
import { Text } from '../Text/Text';

export interface ConfirmDialogProps extends AlertDialog.AlertDialogProps {
    readonly title: string;
    readonly description: string;
    readonly confirmButtonText: string;
    readonly cancelButtonText?: string;
    readonly closeButtonAriaLabel: string;
    readonly onConfirm: (event: UIEvent) => void | Promise<void>;
}

/**
 * Confirm Dialog is based on the Alert Dialog from radix-ui.
 * The dialog can be controlled or uncontrolled.
 * See https://www.radix-ui.com/primitives/docs/components/alert-dialog for more information
 */
export const ConfirmDialog = ({
    title,
    description,
    confirmButtonText,
    cancelButtonText,
    closeButtonAriaLabel,
    onConfirm,
    children,
    loading,
    loadingTextScreenReader,
    loadingSpinnerOnly,
    ...rest
}: ConfirmDialogProps & AllOrNone<ButtonLoadingProps>) => {
    const handleConfirm = (event: UIEvent) => {
        onConfirm(event);
    };
    const loadingProps =
        loading !== undefined ? { loading, loadingTextScreenReader, loadingSpinnerOnly } : {};

    return (
        <AlertDialog.Root {...rest}>
            {children}

            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 z-40 bg-black/50 dark:bg-gray-950/75" />

                <AlertDialog.Content className="fixed top-0 left-0 z-50 h-full w-full overflow-x-hidden overflow-y-auto p-4 md:p-6">
                    <div className="flex min-h-full items-center justify-center">
                        <div className="bg-t-bg-secondary flex w-full max-w-[432px] flex-col rounded-lg p-4 sm:p-6">
                            <div className="mb-2 flex items-start justify-between md:mb-3">
                                <AlertDialog.Title asChild>
                                    <Heading asChild size="md">
                                        <h1>{title}</h1>
                                    </Heading>
                                </AlertDialog.Title>

                                <AlertDialog.Cancel asChild>
                                    <IconButton
                                        icon="close"
                                        size="sm"
                                        aria-label={closeButtonAriaLabel}
                                        tabIndex={0}
                                    />
                                </AlertDialog.Cancel>
                            </div>

                            <AlertDialog.Description asChild className="mb-4 md:mb-6">
                                <Text as="p">{description}</Text>
                            </AlertDialog.Description>

                            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                                {cancelButtonText && (
                                    <AlertDialog.Cancel asChild>
                                        <Button variant="outline" className="grow">
                                            {cancelButtonText}
                                        </Button>
                                    </AlertDialog.Cancel>
                                )}

                                <AlertDialog.Action asChild>
                                    <Button
                                        className="grow"
                                        onClick={handleConfirm}
                                        {...loadingProps}
                                    >
                                        {confirmButtonText}
                                    </Button>
                                </AlertDialog.Action>
                            </div>
                        </div>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
};

ConfirmDialog.Trigger = AlertDialog.Trigger;
