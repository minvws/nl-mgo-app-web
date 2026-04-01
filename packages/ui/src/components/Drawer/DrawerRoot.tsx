import * as Dialog from '@radix-ui/react-dialog';
import { type ReactNode, useState } from 'react';
import { DrawerContext } from './DrawerContext';

export type DrawerRootProps = Dialog.DialogProps & { readonly children: ReactNode };

export const DrawerRoot = ({
    open: openProp,
    defaultOpen,
    onOpenChange,
    children,
    ...rest
}: DrawerRootProps) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen ?? false);
    const isControlled = openProp !== undefined;
    const open = isControlled ? openProp : uncontrolledOpen;

    const handleOpenChange = (nextOpen: boolean) => {
        if (!isControlled) {
            setUncontrolledOpen(nextOpen);
        }
        onOpenChange?.(nextOpen);
    };

    return (
        <DrawerContext.Provider value={{ open }}>
            <Dialog.Root open={open} onOpenChange={handleOpenChange} {...rest}>
                {children}
            </Dialog.Root>
        </DrawerContext.Provider>
    );
};
