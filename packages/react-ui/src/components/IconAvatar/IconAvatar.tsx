import { twMerge } from 'tailwind-merge';
import { type HTMLAttributes } from 'react';
import { defaultIconColors, type IconName } from '../Icon/icons';
import { Icon } from '../Icon/Icon';

export interface IconAvatarProps extends HTMLAttributes<HTMLElement> {
    name?: IconName;
    label?: string;
}

function getDefaultColor(name?: IconName): string {
    return defaultIconColors[name!] ?? 'bg-grey-100 dark:text-black';
}

export const IconAvatar = ({ name, label, className, ...rest }: IconAvatarProps) => {
    return (
        <figure
            className={twMerge(
                'flex h-8 w-8 items-center justify-center rounded-full sm:h-12 sm:w-12',
                getDefaultColor(name),
                className
            )}
            {...rest}
        >
            {name && (
                <Icon
                    name={name}
                    label={label}
                    className="h-[1.25em] w-[1.25em] sm:h-[1.75em] sm:w-[1.75em]"
                />
            )}
        </figure>
    );
};
