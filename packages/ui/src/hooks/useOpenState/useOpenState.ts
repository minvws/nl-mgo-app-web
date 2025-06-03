import { useCallback, useState } from 'react';

export interface UseOpenStateProps {
    defaultOpen?: boolean;
    beforeClose?(): void;
    afterClose?(): void;
    beforeOpen?(): void;
    afterOpen?(): void;
}

export function useOpenState(props: UseOpenStateProps = {}) {
    const { defaultOpen, beforeClose, afterClose, beforeOpen, afterOpen } = props;

    const [isOpen, setIsOpen] = useState(defaultOpen ?? false);

    const setIsOpenWithCallbacks = useCallback(
        (open: boolean) => {
            if (open) {
                beforeOpen?.();
                setIsOpen(open);
                afterOpen?.();
            } else {
                beforeClose?.();
                setIsOpen(open);
                afterClose?.();
            }
        },
        [afterClose, afterOpen, beforeClose, beforeOpen]
    );

    return {
        isOpen,
        setIsOpen: setIsOpenWithCallbacks,
        open: useCallback(() => setIsOpenWithCallbacks(true), [setIsOpenWithCallbacks]),
        close: useCallback(() => setIsOpenWithCallbacks(false), [setIsOpenWithCallbacks]),
        toggle: useCallback(
            () => setIsOpenWithCallbacks(!isOpen),
            [isOpen, setIsOpenWithCallbacks]
        ),
    };
}
