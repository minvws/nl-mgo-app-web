import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { Icon } from '../Icon/Icon';

export type SpinnerProps = HTMLAttributes<SVGElement>;

export type IconProps = Omit<HTMLAttributes<SVGElement>, 'aria-label' | 'aria-hidden' | 'role'> &
    (
        | {
              ['role']: string;
              ['aria-label']: string;
              ['aria-hidden']: never;
          }
        | { ['role']: never; ['aria-label']: never; ['aria-hidden']: boolean }
    );

export const Spinner = ({ className, ...rest }: SpinnerProps) => {
    return (
        <Icon
            name="ProgressActivity"
            className={twMerge('animate-spin fill-current', className)}
            role="progressbar"
            label="Laden..."
            aria-valuetext="Laden..."
            aria-busy="true"
            aria-live="assertive"
            {...rest}
        />
    );
};
