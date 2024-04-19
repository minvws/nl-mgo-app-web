import { type InputHTMLAttributes, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { useUniqueId } from '../../hooks/useUniqueId/useUniqueId';
import { Icon } from '../Icon/Icon';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: ReactNode;
    error?: string;
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
        ['aria-invalid']: true,
        ['aria-describedby']: validationMessageId,
    };

    return (
        <div className={twMerge(`flex w-full flex-col gap-3`, className)} {...rest}>
            <label htmlFor={inputId} className="text-lg leading-normal text-black dark:text-white">
                {label}
            </label>
            <input
                className="border-grey-500 dark:bg-grey-900 h-16 rounded-lg border p-4 text-lg shadow-sm outline-none focus:border-black dark:text-white dark:focus:border-white"
                type={type}
                id={inputId}
                name={name}
                required={required}
                {...errorProps}
            />
            {error && (
                <span
                    className="flex items-center gap-2 text-lg font-bold leading-normal text-[#D52A1E]"
                    id={validationMessageId}
                >
                    <Icon name="Cancel" className="h-6 w-6" />
                    {error}
                </span>
            )}
        </div>
    );
};
