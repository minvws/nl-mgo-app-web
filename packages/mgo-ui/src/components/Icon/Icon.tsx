import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { iconPaddings, icons, type IconName } from './icons';

export interface IconProps extends HTMLAttributes<SVGElement> {
    readonly icon: IconName;
}

export const Icon = ({ icon, ['aria-label']: ariaLabel, className, ...rest }: IconProps) => {
    const IconComponent = icons[icon];
    if (!IconComponent) {
        throw new Error(`Could not find icon: "${icon}"`);
    }

    return (
        <IconComponent
            role="img"
            aria-label={ariaLabel}
            aria-hidden={!ariaLabel}
            className={twMerge(
                'h-[1em] w-[1em] shrink-0 fill-current',
                iconPaddings[icon],
                className
            )}
            {...rest}
        />
    );
};
