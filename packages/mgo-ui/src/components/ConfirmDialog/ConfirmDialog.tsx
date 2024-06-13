import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { type UIEvent } from 'react';
import { Button } from '../Button/Button';
import { Heading } from '../Heading/Heading';
import { IconButton } from '../IconButton/IconButton';
import { Text } from '../Text/Text';

export interface ConfirmDialogProps extends AlertDialog.AlertDialogProps {
    title: string;
    description: string;
    confirmButtonText: string;
    cancelButtonText: string;
    closeButtonAriaLabel: string;
    onConfirm: (event: UIEvent) => void;
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
    onOpenChange,
    children,
    ...rest
}: ConfirmDialogProps) => {
    const handleConfirm = (event: UIEvent) => {
        onConfirm(event);
    };

    return (
        <AlertDialog.Root onOpenChange={onOpenChange} {...rest}>
            {children}

            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-75 dark:bg-gray-700" />

                <AlertDialog.Content className="fixed left-0 top-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden p-4 md:p-6">
                    <div className="flex min-h-full items-center justify-center">
                        <div className="flex w-full max-w-[432px] flex-col gap-4 rounded-lg bg-white p-4 shadow-sm sm:gap-6 sm:p-6 dark:bg-gray-900">
                            <div className="flex items-start justify-between">
                                <AlertDialog.Title asChild>
                                    <Heading asChild>
                                        <h1>{title}</h1>
                                    </Heading>
                                </AlertDialog.Title>

                                <AlertDialog.Cancel asChild>
                                    <IconButton
                                        icon="close"
                                        aria-label={closeButtonAriaLabel}
                                        className="h-7 w-7 text-xs sm:h-8 sm:w-8"
                                    />
                                </AlertDialog.Cancel>
                            </div>

                            <AlertDialog.Description asChild>
                                <Text>{description}</Text>
                            </AlertDialog.Description>

                            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                                <AlertDialog.Action asChild>
                                    <Button className="flex-grow" onClick={handleConfirm}>
                                        {confirmButtonText}
                                    </Button>
                                </AlertDialog.Action>
                                <AlertDialog.Cancel asChild>
                                    <Button variant="light" className="flex-grow">
                                        {cancelButtonText}
                                    </Button>
                                </AlertDialog.Cancel>
                            </div>
                        </div>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
};

ConfirmDialog.Trigger = AlertDialog.Trigger;
