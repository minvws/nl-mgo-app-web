import { twMerge } from 'tailwind-merge';
import { type HTMLAttributes } from 'react';
import { iconColours, type IconName } from '../Icon/icons';
import { Icon } from '../Icon/Icon';

export interface IconAvatarProps extends HTMLAttributes<HTMLElement> {
    icon?: IconName;
    iconAriaLabel?: string;
}

export const IconAvatar = ({ icon, iconAriaLabel, className, ...rest }: IconAvatarProps) => (
    <figure
        className={twMerge(
            'flex h-8 w-8 items-center justify-center rounded-full sm:h-12 sm:w-12',
            iconColours[icon!] || 'bg-gray-100 dark:text-black',
            className
        )}
        {...rest}
    >
        {icon && (
            <Icon
                icon={icon}
                aria-label={iconAriaLabel}
                className="h-[1.25em] w-[1.25em] sm:h-[1.75em] sm:w-[1.75em]"
            />
        )}
    </figure>
);
