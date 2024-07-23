import { twMerge } from 'tailwind-merge';
import { type HTMLAttributes } from 'react';
import { iconColours, type IconName } from '../Icon/icons';
import { Icon } from '../Icon/Icon';

export interface IconAvatarProps extends HTMLAttributes<HTMLElement> {
    readonly icon?: IconName;
    readonly ariaLabel?: string;
}

export const IconAvatar = ({ icon, ariaLabel, className, ...rest }: IconAvatarProps) => (
    <figure
        className={twMerge(
            'flex h-8 w-8 items-center justify-center rounded-full sm:h-12 sm:w-12',
            iconColours[icon!] ?? 'bg-gray-50 dark:text-black',
            className
        )}
        aria-label={ariaLabel}
        aria-hidden={!ariaLabel}
        {...rest}
    >
        {icon && <Icon icon={icon} className="h-[1.25em] w-[1.25em] sm:h-[1.75em] sm:w-[1.75em]" />}
    </figure>
);
