import { type HTMLAttributes } from 'react';
import { illustrations, type IllustrationName } from './illustrations';
import { twMerge } from 'tailwind-merge';

export interface IllustrationProps extends HTMLAttributes<HTMLElement> {
    readonly illustration: IllustrationName;
}

export const Illustration = ({ illustration, className, ...rest }: IllustrationProps) => {
    const image = illustrations[illustration];

    return (
        <picture className={twMerge('flex', className)} {...rest}>
            <source srcSet={image.dark} media="(prefers-color-scheme: dark)" />
            <img src={image.light} alt="" className="w-full max-w-full object-contain" />
        </picture>
    );
};
