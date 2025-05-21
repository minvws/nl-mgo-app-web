import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { illustrations, type IllustrationName } from './illustrations';

export interface IllustrationProps extends HTMLAttributes<HTMLElement> {
    readonly illustration: IllustrationName;
    readonly forceDarkMode?: boolean;
}

export const Illustration = ({
    illustration,
    forceDarkMode,
    className,
    ...rest
}: IllustrationProps) => {
    const image = illustrations[illustration];

    return (
        <picture className={twMerge('flex', className)} {...rest}>
            <source srcSet={image.dark} media="(prefers-color-scheme: dark)" />
            <img
                src={forceDarkMode ? image.dark : image.light}
                alt=""
                className="w-full max-w-full object-contain"
            />
        </picture>
    );
};
