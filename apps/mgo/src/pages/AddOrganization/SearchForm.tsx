import { FormattedMessage, useIntl } from '$/intl';
import { Button, cn, InputField } from '@minvws/mgo-ui';
import {
    useCallback,
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent,
    type HTMLAttributes,
} from 'react';
import { useDebounceCallback } from 'usehooks-ts';

export interface SearchFormData {
    name: string;
    city: string;
}

export interface SearchFormProps extends Omit<HTMLAttributes<HTMLElement>, 'onSubmit'> {
    onSubmit(value: SearchFormData): void;
}

export const SearchForm = ({ onSubmit, className, ...rest }: SearchFormProps) => {
    const { formatMessage } = useIntl();
    const [dirty, setDirty] = useState(false);
    const [formData, setFormData] = useState<SearchFormData>({
        name: '',
        city: '',
    });

    const [errorState, setErrorState] = useState<Partial<SearchFormData>>({});

    const validate = useCallback(() => {
        const { name, city } = formData;
        const errorMessages: Partial<SearchFormData> = {};
        if (name.length === 0) {
            errorMessages.name = formatMessage('add_organization.error_missing_name');
        }

        if (city.length === 0) {
            errorMessages.city = formatMessage('add_organization.error_missing_city');
        }

        setErrorState(errorMessages);
        return Object.keys(errorMessages).length === 0;
    }, [formData, formatMessage]);

    const debouncedValidate = useDebounceCallback(validate, 100);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value.trim() }));
    };

    useEffect(() => {
        if (dirty) {
            debouncedValidate();
        }
    }, [formData, dirty, debouncedValidate]);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setDirty(true);

        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={cn('flex flex-col gap-6 md:flex-row md:items-end', className)}
            noValidate
            {...rest}
        >
            <InputField
                name="name"
                label={
                    <>
                        <FormattedMessage id="add_organization.name" description="Naam" />
                        <span className="ml-1" aria-hidden="true">
                            <FormattedMessage id="common.required" description="(verplicht)" />
                        </span>
                    </>
                }
                value={formData.name}
                error={errorState.name}
                required
                onChange={handleChange}
            />
            <InputField
                name="city"
                label={
                    <>
                        <FormattedMessage id="add_organization.city" description="Plaats" />
                        <span className="ml-1" aria-hidden="true">
                            <FormattedMessage id="common.required" description="(verplicht)" />
                        </span>
                    </>
                }
                value={formData.city}
                error={errorState.city}
                required
                onChange={handleChange}
            />
            <Button type="submit">
                <FormattedMessage id="common.search" description="Zoeken" />
            </Button>
        </form>
    );
};
