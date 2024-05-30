import { useContext, type HTMLAttributes } from 'react';
import { AccordionContext } from './AccordionContext';
import { Collapse } from './Collapse';

export interface AccordionPanelProps extends HTMLAttributes<HTMLDivElement> {}

export const AccordionPanel = ({ ...rest }: AccordionPanelProps) => {
    const { expanded, panelId, buttonId } = useContext(AccordionContext);

    return (
        <Collapse
            id={panelId}
            aria-labelledby={buttonId}
            expanded={expanded}
            className="pt-4 md:pt-6"
            role="region"
            {...rest}
        />
    );
};

AccordionPanel.displayName = 'Accordion.Panel';
