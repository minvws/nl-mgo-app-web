import { ButtonHTMLAttributes } from 'react';
import { SetRequired } from 'type-fest';
import { groupFocusStyle } from '../../styles';
import { cn } from '../../utils';
import { Icon } from '../Icon/Icon';

export type ClearButtonProps = Omit<
    SetRequired<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'>,
    'type' | 'children'
>;

export const ClearButton = ({ 'aria-label': ariaLabel, className, ...rest }: ClearButtonProps) => {
    return (
        <button
            type="reset"
            aria-label={ariaLabel}
            className={cn(
                'flex items-center justify-center',
                'min-h-10 min-w-10 cursor-pointer',
                'group outline-hidden',
                className
            )}
            {...rest}
        >
            <Icon
                icon="cancel-fill"
                className={cn(
                    'size-6 rounded-full',
                    'fill-t-symbol-secondary group-hover:fill-t-cat-rijkslint',
                    'transition-colors duration-200',
                    groupFocusStyle
                )}
            />
        </button>
    );
};
