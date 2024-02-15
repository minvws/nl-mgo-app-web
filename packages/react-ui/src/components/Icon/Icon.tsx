import { twMerge } from 'tailwind-merge';
import { type HTMLAttributes } from 'react';
import { type IconName, icons } from './icons';

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
