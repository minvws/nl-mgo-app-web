import { type UIEvent } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Button } from '../Button/Button';
import { cn } from '../../utils';

export interface ConfirmDialogProps extends AlertDialog.AlertDialogProps {
    title: string;
    description: string;
    confirmButtonText: string;
    cancelButtonText: string;
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
                    <AlertDialog.Title asChild>
                        <h1 className="text-2xl font-bold leading-tight">{title}</h1>
                    </AlertDialog.Title>
                    <AlertDialog.Description className="text-md">
                        {description}
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
