import { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn/cn';
import { Text } from '../Text/Text';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    readonly invalid?: boolean;
}

export const Input = ({ type = 'text', invalid, className, size, ...rest }: InputProps) => {
    return (
        <Text
            size="md"
            asChild
            className={cn(
                'bg-t-bg-secondary px-4 py-2',
                'rounded-lg outline-hidden',
                'border-t-seperator-primary border-2',
                'focus:border-t-cat-rijkslint',
                'aria-[invalid]:border-t-state-critical',
                'placeholder:text-t-label-secondary',
                className
            )}
            {...rest}
        >
            <input
                type={type}
                size={size}
                {...(!!invalid && {
                    'aria-invalid': true,
                })}
            />
        </Text>
    );
};
