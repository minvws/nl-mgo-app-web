import { twMerge } from 'tailwind-merge';
import { type HTMLAttributes } from 'react';
import { defaultIconColors, type IconName } from '../Icon/icons';
import { Icon } from '../Icon/Icon';

export interface IconAvatarProps extends HTMLAttributes<HTMLElement> {
    name?: IconName;
    label?: string;
}

function getDefaultColor(name?: IconName): string {
    return defaultIconColors[name!] ?? 'bg-grey-100';
}

export const IconAvatar = ({ name, label, className, ...rest }: IconAvatarProps) => {
    return (
        <figure
            className={twMerge(
                'flex h-12 w-12 items-center justify-center rounded-full',
                getDefaultColor(name),
                className
            )}
            {...rest}
        >
            {name && <Icon name={name} label={label} className="h-[1.75em] w-[1.75em]" />}
        </figure>
    );
};
