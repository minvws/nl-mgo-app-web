import { type HTMLAttributes } from 'react';
import { icons } from './Icons';
import { type Status } from './statuses';
import { cn } from '../../utils';
import { useOpenState } from '../../hooks';
import { IconButton } from '../IconButton/IconButton';

export interface AlertProps extends HTMLAttributes<HTMLElement> {
    readonly label: string;
    readonly status: Status;
    readonly 'aria-label': string;
}

export const Alert = ({
    label,
    status,
    ['aria-label']: ariaLabel,
    className,
    children,
    ...rest
}: AlertProps) => {
    const { isOpen, close } = useOpenState({
        defaultOpen: true,
    });

    return (
        isOpen && (
            <div
                role="alert"
                className={cn(
                    `flex w-full gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-500 dark:bg-gray-900`,
                    className
                )}
                {...rest}
            >
                <div className={`h-6 w-6`}>{icons[status]}</div>
                <div className={`flex flex-grow flex-col gap-1`}>
                    <span className={`text-base font-bold text-black dark:text-white`}>
                        {label}
                    </span>
                    <span className={`text-base font-normal text-gray-600 dark:text-gray-300`}>
                        {children}
                    </span>
                </div>
                <IconButton
                    className="self-start"
                    icon="close"
                    size="sm"
                    aria-label={ariaLabel}
                    onClick={close}
                />
            </div>
        )
    );
};
