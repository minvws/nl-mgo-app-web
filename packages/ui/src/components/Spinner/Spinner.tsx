import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { LoadingCircle, type LoadingCircleProps } from './LoadingCircle';

export type SpinnerProps = HTMLAttributes<SVGElement> & Pick<LoadingCircleProps, 'variant'>;

export const Spinner = ({ className, ['aria-label']: ariaLabel, ...rest }: SpinnerProps) => {
    const a11yProps = ariaLabel
        ? ({
              role: 'progressbar',
              ['aria-label']: ariaLabel,
              ['aria-valuetext']: ariaLabel,
              ['aria-busy']: true,
              ['aria-live']: 'assertive',
          } as const)
        : {
              ['aria-hidden']: true,
          };

    return (
        <LoadingCircle
            data-testid="spinner"
            className={twMerge('size-12 animate-spin', className)}
            {...a11yProps}
            {...rest}
        />
    );
};
