import { HTMLAttributes, InputHTMLAttributes, type ReactNode } from 'react';
import { useUniqueId } from '../../hooks/useUniqueId/useUniqueId';
import { cn } from '../../utils';
import { Icon } from '../Icon/Icon';
import { Input } from '../Input/Input';
import { Text } from '../Text/Text';

export type InputProps = Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'name' | 'required' | 'value' | 'onChange'
>;

export type InputFieldProps = HTMLAttributes<HTMLElement> &
    InputProps & {
        readonly label: ReactNode;
        readonly error?: string;
    };

export const InputField = ({
    type = 'text',
    name,
    required = false,
    label,
    error,
    className,
    onChange,
    value,
    ...rest
}: InputFieldProps) => {
    const [inputId, validationMessageId] = useUniqueId('input', 'validation-message');
    const inputProps = {
        id: inputId,
        name,
        value,
        type,
        onChange,
        required,
        ...(!!error && {
            'aria-invalid': true,
            'aria-describedby': validationMessageId,
        }),
    };
    return (
        <Text
            size="md"
            as="div"
            className={cn(`text-t-label-primary flex w-full flex-col gap-3`, className)}
            {...rest}
        >
            <label htmlFor={inputId}>{label}</label>

            <Input {...inputProps} />

            {error && (
                <span
                    className="text-t-state-critical flex items-center gap-2 font-bold"
                    id={validationMessageId}
                >
                    <Icon icon="cancel-fill" className="h-6 w-6" />
                    {error}
                </span>
            )}
        </Text>
    );
};
