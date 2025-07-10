import { type InputHTMLAttributes, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { useUniqueId } from '../../hooks/useUniqueId/useUniqueId';
import { Icon } from '../Icon/Icon';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    readonly label: ReactNode;
    readonly error?: string;
}

export const InputField = ({
    type = 'text',
    name,
    label,
    required = false,
    error,
    className,
    ...rest
}: InputFieldProps) => {
    const [inputId, validationMessageId] = useUniqueId('input', 'validation-message');
    const errorProps = !!error && {
        'aria-invalid': true,
        'aria-describedby': validationMessageId,
    };

    return (
        <div className={twMerge(`flex w-full flex-col gap-3`, className)} {...rest}>
            <label htmlFor={inputId} className="text-md leading-normal text-black dark:text-white">
                {label}
            </label>
            <input
                className="text-md h-16 rounded-lg border border-gray-500 p-4 shadow-sm outline-none focus:border-2 focus:border-black aria-[invalid]:border-2 aria-[invalid]:border-red-600 dark:bg-gray-900 dark:text-white dark:focus:border-white dark:aria-[invalid]:border-red-400"
                type={type}
                id={inputId}
                name={name}
                required={required}
                {...errorProps}
            />
            {error && (
                <span
                    className="text-md flex items-center gap-2 font-bold leading-normal text-red-600 dark:text-red-400"
                    id={validationMessageId}
                >
                    <Icon icon="cancel" className="h-6 w-6" />
                    {error}
                </span>
            )}
        </div>
    );
};
