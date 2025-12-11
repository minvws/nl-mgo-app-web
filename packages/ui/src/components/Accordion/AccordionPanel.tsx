import { useContext, type HTMLAttributes } from 'react';
import { Collapsible } from '../Collapsible/Collapsible';
import { AccordionContext } from './AccordionContext';

export type AccordionPanelProps = HTMLAttributes<HTMLDivElement>;

export const AccordionPanel = ({ ...rest }: AccordionPanelProps) => {
    const { expanded, panelId, buttonId } = useContext(AccordionContext);

    return (
        <Collapsible
            id={panelId}
            aria-labelledby={buttonId}
            isOpen={expanded}
            className="pt-4 md:pt-6"
            role="region"
            {...rest}
        />
    );
};

AccordionPanel.displayName = 'Accordion.Panel';
