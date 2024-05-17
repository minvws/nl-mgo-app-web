import { type UIEvent } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Button } from '../Button/Button';
import { cn } from '../../utils';
import { IconButton } from '../IconButton/IconButton';
import { Heading } from '../Heading/Heading';
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
                <AlertDialog.Content
                    className={cn(
                        'fixed left-1/2 top-1/2 z-50 flex w-[432px] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900'
                    )}
                >
                    <div className="flex items-start justify-between">
                        <AlertDialog.Title asChild>
                            <Heading asChild>
                                <h1>{title}</h1>
                            </Heading>
                        </AlertDialog.Title>
                        <AlertDialog.Cancel asChild>
                            <IconButton icon="close" aria-label={closeButtonAriaLabel} rounded />
                        </AlertDialog.Cancel>
                    </div>
                    <AlertDialog.Description asChild>
                        <Text>{description}</Text>
                    </AlertDialog.Description>
                    <div className="flex gap-6">
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
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
};

ConfirmDialog.Trigger = AlertDialog.Trigger;
