import { twMerge } from 'tailwind-merge';
import { HTMLAttributes } from 'react';
import { IconName, icons } from './icons';

export interface IconProps extends HTMLAttributes<SVGElement> {
    name: IconName;
    label?: string;
}

export const Icon = ({ name, label = undefined, className, ...rest }: IconProps) => {
    const IconComponent = icons[name];
    return (
        <IconComponent
            role="img"
            aria-label={label}
            aria-hidden={!label}
            className={twMerge('h-[1em] w-[1em] fill-current', className)}
            {...rest}
        />
    );
};
