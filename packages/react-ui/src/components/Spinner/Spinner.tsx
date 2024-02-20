import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

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
        // material-symbols/svg/400/outlined/progress_activity.svg
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={twMerge(`h-[1em] w-[1em] animate-spin fill-current`, className)}
            width="48"
            height="48"
            viewBox="0 -960 960 960"
            role="progressbar"
            aria-valuetext="Laden..."
            aria-busy="true"
            aria-live="assertive"
            {...rest}
        >
            <path
                fill="current"
                d="M480-80q-84 0-157-31t-127-85q-54-54-85-127T80-480q0-84 31-157t85-127q54-54 127-85t157-31q12 0 21 9t9 21q0 12-9 21t-21 9q-141 0-240.5 99.5T140-480q0 141 99.5 240.5T480-140q141 0 240.5-99.5T820-480q0-12 9-21t21-9q12 0 21 9t9 21q0 84-31 157t-85 127q-54 54-127 85T480-80Z"
            />
        </svg>
    );
};
