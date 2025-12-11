import { uniqueId } from 'lodash';
import { useMemo, useState, type HTMLAttributes } from 'react';
import { cn } from '../../utils';
import { Card } from '../Card/Card';
import { AccordionButton } from './AccordionButton';
import { AccordionContext, type AccordionContextState } from './AccordionContext';
import { AccordionPanel } from './AccordionPanel';

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
    readonly defaultExpanded?: boolean;
}

export const Accordion = ({
    children,
    defaultExpanded = false,
    className,
    ...rest
}: AccordionProps) => {
    const [expanded, setExpanded] = useState(defaultExpanded);
    const [id] = useState(uniqueId('accordion-'));

    const contextValue = useMemo<AccordionContextState>(
        () => ({
            expanded,
            panelId: `${id}-panel`,
            buttonId: `${id}-button`,
            toggle: () => setExpanded(!expanded),
        }),
        [expanded, id]
    );

    return (
        <Card className="p-4 md:p-6">
            <AccordionContext.Provider value={contextValue}>
                <div className={cn(`relative`, className)} {...rest}>
                    {children}
                </div>
            </AccordionContext.Provider>
        </Card>
    );
};

Accordion.Button = AccordionButton;
Accordion.Panel = AccordionPanel;
