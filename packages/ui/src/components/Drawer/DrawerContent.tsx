import { AllOrNone } from '@minvws/mgo-utils';
import * as Dialog from '@radix-ui/react-dialog';
import { DialogContentProps } from '@radix-ui/react-dialog';
import { cn } from '../../utils';
import { Button } from '../Button/Button';
import { Heading } from '../Heading/Heading';
import { useDrawerOpen } from './DrawerContext';
import { DrawerTransition } from './DrawerTransition';

export type DrawerSide = 'left' | 'right' | 'bottom';

export type DrawerContentProps = DialogContentProps & {
    readonly title: string;
    readonly closeButtonLabel: string;
    readonly side?: DrawerSide;
} & AllOrNone<{
        readonly backButtonLabel: string;
        readonly showBackButton: boolean;
        readonly onBackButtonClick: () => void;
    }>;

const sideStyles: Record<DrawerSide, string> = {
    left: 'top-0 left-0 h-dvh w-full max-w-[595px] border-r',
    right: 'top-0 right-0 h-dvh w-full max-w-[595px] border-l',
    bottom: 'right-0 bottom-0 left-0 h-[92dvh] w-full border-t',
};

export const DrawerContent = ({
    title,
    closeButtonLabel,
    backButtonLabel,
    showBackButton,
    onBackButtonClick,
    side = 'right',
    children,
    className,
    ...rest
}: DrawerContentProps) => {
    const open = useDrawerOpen();

    return (
        <DrawerTransition open={open} side={side}>
            {({ overlayClassName, contentClassName, overlayStyle, contentStyle }) => (
                <Dialog.Portal forceMount>
                    <Dialog.Overlay asChild forceMount>
                        <div style={overlayStyle} className={overlayClassName} />
                    </Dialog.Overlay>

                    <Dialog.Content forceMount asChild aria-describedby={undefined} {...rest}>
                        <div
                            style={contentStyle}
                            className={cn(
                                'bg-t-bg-primary fixed z-50 flex flex-col overflow-hidden p-4 shadow-lg outline-hidden sm:p-6',
                                'border-t-seperator-secondary',
                                sideStyles[side],
                                contentClassName,
                                className
                            )}
                        >
                            <div className="flex items-start justify-between gap-3">
                                {showBackButton && (
                                    <Button
                                        leftIcon="arrow_back"
                                        variant="ghost"
                                        onClick={onBackButtonClick}
                                    >
                                        {backButtonLabel}
                                    </Button>
                                )}

                                <Dialog.Close asChild>
                                    <Button leftIcon="close" variant="ghost">
                                        {closeButtonLabel}
                                    </Button>
                                </Dialog.Close>
                            </div>

                            <div className="min-h-0 flex-1 overflow-y-auto pt-1">
                                <Dialog.Title asChild>
                                    <Heading asChild size="md">
                                        <h2>{title}</h2>
                                    </Heading>
                                </Dialog.Title>

                                <div>{children}</div>
                            </div>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            )}
        </DrawerTransition>
    );
};
