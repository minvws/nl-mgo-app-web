import { ChangeEvent, HTMLAttributes } from 'react';
import { cn } from '../../utils';
import { Input } from '../Input/Input';
import { ClearButton } from './ClearButton';
import { SearchIcon } from './SearchIcon';

export type SearchFormProps = Omit<HTMLAttributes<HTMLElement>, 'onChange'> & {
    readonly clearAriaLabel: string;
    readonly value: string;
    readonly onChange: (value: string) => void;
    readonly onSubmit?: (value: string) => void;
    readonly placeholder?: string;
    readonly loading?: boolean;
};

export const SearchForm = ({
    clearAriaLabel,
    className,
    onChange,
    onSubmit,
    value,
    placeholder,
    loading,
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
            <SearchIcon loading={loading} className="absolute top-1/2 left-4 -translate-y-1/2" />
            <Input
                className={'peer w-full pr-12 pl-12'}
                required
                value={value}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />
            <ClearButton
                aria-label={clearAriaLabel}
                className="visible absolute top-1/2 right-2 -translate-y-1/2 peer-invalid:invisible"
                onClick={clearValue}
            />
        </form>
    );
};
