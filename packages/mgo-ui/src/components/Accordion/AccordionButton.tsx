import { useContext, type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { AccordionContext } from './AccordionContext';
import { Icon } from '../Icon/Icon';

export interface AccordionButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const AccordionButton = ({ children, className, ...rest }: AccordionButtonProps) => {
    const { expanded, toggle, panelId, buttonId } = useContext(AccordionContext);

    return (
        <button
            className={twMerge(
                `relative flex w-full flex-row items-center justify-between gap-4`,
                className
            )}
            {...rest}
            onClick={toggle}
            id={buttonId}
            aria-expanded={expanded}
            aria-controls={panelId}
        >
            <span className="text-2xl font-bold">{children}</span>
            <Icon
                icon="chevron-right"
                className={`ease-[cubic-bezier(0.4, 0, 0.2, 1)] text-grey-500 h-8  w-8 transform transition-[transform] duration-300 ${expanded ? '-rotate-90' : 'rotate-90'}`}
            />
        </button>
    );
};

AccordionButton.displayName = 'Accordion.Button';
