import { useContext, type HTMLAttributes } from 'react';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { Icon } from '../Icon/Icon';
import { AccordionContext } from './AccordionContext';

export type AccordionButtonProps = HTMLAttributes<HTMLButtonElement>;

export const AccordionButton = ({ children, className, ...rest }: AccordionButtonProps) => {
    const { expanded, toggle, panelId, buttonId } = useContext(AccordionContext);

    return (
        <button
            className={cn(
                `relative flex w-full flex-row justify-between gap-4`,
                focusStyle,
                className
            )}
            {...rest}
            onClick={toggle}
            id={buttonId}
            aria-expanded={expanded}
            aria-controls={panelId}
        >
            <span className="text-left text-sm font-bold md:text-xl">{children}</span>
            <Icon
                icon="chevron-right"
                className={`ease-[cubic-bezier(0.4, 0, 0.2, 1)] text-grey-500 h-8 w-8 transform transition-[transform] duration-300 ${expanded ? '-rotate-90' : 'rotate-90'} relative top-[3px]`}
            />
        </button>
    );
};

AccordionButton.displayName = 'Accordion.Button';
