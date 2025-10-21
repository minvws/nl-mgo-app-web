import { Card } from '@minvws/mgo-ui/components/Card/Card.js';
import { IconButton, IconButtonProps } from '@minvws/mgo-ui/components/IconButton/IconButton.js';
import { Text } from '@minvws/mgo-ui/components/Text/Text.js';
import { cn } from '@minvws/mgo-ui/utils/index.js';
import { HTMLAttributes, ReactNode } from 'react';
import { Collapsible } from '../Collapsible/Collapsible';

export interface ClosableCardProps extends HTMLAttributes<HTMLDivElement> {
    readonly title: string;
    readonly children: ReactNode;
    readonly isOpen: boolean;
    readonly onClose: IconButtonProps['onClick'];
    readonly closeButtonAriaLabel?: string;
}

export const ClosableCard = ({
    title,
    children,
    className,
    isOpen,
    onClose,
    closeButtonAriaLabel = 'Close',
    ...rest
}: ClosableCardProps) => {
    return (
        <Collapsible isOpen={isOpen}>
            <Card
                className={cn(
                    'bg-opacity-15 dark:bg-opacity-[0.14] mt-2 rounded-lg bg-[#01689B] p-2 dark:bg-[#66A4C3]',
                    className
                )}
                {...rest}
            >
                <div className="mt-2 flex justify-between">
                    <Text className="ml-1 font-bold text-[#01689B] dark:text-[#66A4C3]">
                        {title}
                    </Text>
                    <IconButton
                        icon="close"
                        size="sm"
                        variant="ghost"
                        aria-label={closeButtonAriaLabel}
                        className="dark:text-[#66A4C3]"
                        onClick={onClose}
                    />
                </div>

                <Text className="m-1 text-[#01689B] dark:text-[#66A4C3]">{children}</Text>
            </Card>
        </Collapsible>
    );
};
