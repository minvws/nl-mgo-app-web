import { Card } from '@minvws/mgo-ui/components/Card/Card.js';
import { IconButton, IconButtonProps } from '@minvws/mgo-ui/components/IconButton/IconButton.js';
import { Text } from '@minvws/mgo-ui/components/Text/Text.js';
import { cn } from '@minvws/mgo-ui/utils/index.js';
import { HTMLAttributes, ReactNode } from 'react';
import { Collapsible } from '../Collapsible/Collapsible';
import { Heading } from '../Heading/Heading';

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
                    'bg-dark-blue-500/15 dark:bg-dark-blue-300/[0.14] rounded-lg',
                    className
                )}
                {...rest}
            >
                <div className="flex justify-between">
                    <Heading as="h3" size="xs" className="text-t-state-informative">
                        {title}
                    </Heading>
                    <IconButton
                        icon="close"
                        size="sm"
                        variant="ghost"
                        aria-label={closeButtonAriaLabel}
                        className="text-t-state-informative relative -top-1 -right-1"
                        onClick={onClose}
                    />
                </div>

                <Text as="div" className="text-t-state-informative">
                    {children}
                </Text>
            </Card>
        </Collapsible>
    );
};
