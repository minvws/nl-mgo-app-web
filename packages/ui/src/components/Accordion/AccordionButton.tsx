import { useContext, type HTMLAttributes } from 'react';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';
import { AccordionContext } from './AccordionContext';

export type AccordionButtonProps = HTMLAttributes<HTMLButtonElement>;

export const AccordionButton = ({ children, className, ...rest }: AccordionButtonProps) => {
    const { expanded, toggle, panelId, buttonId } = useContext(AccordionContext);

    return (
        <button
            className={cn(
                `relative flex w-full flex-row justify-between gap-4`,
                'cursor-pointer',
                focusStyle,
                className
            )}
            {...rest}
            onClick={toggle}
            id={buttonId}
            aria-expanded={expanded}
            aria-controls={panelId}
        >
            <Text className="text-left font-bold">{children}</Text>
            <Icon
                icon="chevron_right"
                className={cn(
                    'relative top-[3px] h-8 w-8 transform text-gray-500 transition-[rotate] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
                    expanded ? '-rotate-90' : 'rotate-90'
                )}
            />
        </button>
    );
};

AccordionButton.displayName = 'Accordion.Button';
