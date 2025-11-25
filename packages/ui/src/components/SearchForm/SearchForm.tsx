import { ChangeEvent, HTMLAttributes } from 'react';
import { cn } from '../../utils';
import { Input } from '../Input/Input';
import { ClearButton } from './ClearButton';

export type SearchFormProps = Omit<HTMLAttributes<HTMLElement>, 'onChange'> & {
    readonly clearAriaLabel: string;
    readonly value: string;
    readonly onChange: (value: string) => void;
    readonly onSubmit?: (value: string) => void;
    readonly placeholder?: string;
};

export const SearchForm = ({
    clearAriaLabel,
    className,
    onChange,
    onSubmit,
    value,
    placeholder,
    ...rest
}: SearchFormProps) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    const clearValue = () => {
        onChange('');
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit?.(value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape') {
            clearValue();
        }
    };

    return (
        <form className={cn('relative block', className)} onSubmit={handleSubmit} {...rest}>
            <Input
                className={'peer w-full pr-10'}
                required
                value={value}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />
            <ClearButton
                aria-label={clearAriaLabel}
                className="visible absolute top-1/2 right-0 -translate-y-1/2 peer-invalid:invisible"
                onClick={clearValue}
            />
        </form>
    );
};
