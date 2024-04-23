import { twMerge } from 'tailwind-merge';
import { type HTMLAttributes } from 'react';
import { type IconName, icons } from './icons';

export interface IconProps extends HTMLAttributes<SVGElement> {
    icon: IconName;
}

export const Icon = ({ icon, ['aria-label']: ariaLabel, className, ...rest }: IconProps) => {
    const IconComponent = icons[icon];
    return (
        <IconComponent
            role="img"
            aria-label={ariaLabel}
            aria-hidden={!ariaLabel}
            className={twMerge('h-[1em] w-[1em] fill-current', className)}
            {...rest}
        />
    );
};
