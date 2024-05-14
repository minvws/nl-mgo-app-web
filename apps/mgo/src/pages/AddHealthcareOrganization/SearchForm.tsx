import { Trans, msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Button, InputField } from '@minvws/mgo-mgo-ui';
import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

export interface SearchFormData {
    name: string;
    city: string;
}

export interface SearchFormProps {
    onSubmit(value: SearchFormData): void;
}

export const SearchForm = ({ onSubmit }: SearchFormProps) => {
    const { _ } = useLingui();
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
            errorMessages.name = _(
                msg({
                    id: 'add-healthcare-provider.input.name.validation',
                    message: 'Vul een naam in',
                })
            );
        }

        if (city.length === 0) {
            errorMessages.city = _(
                msg({
                    id: 'add-healthcare-provider.input.city.validation',
                    message: 'Vul een plaats in',
                })
            );
        }

        setErrorState(errorMessages);
        return Object.keys(errorMessages).length === 0;
    }, [formData, _]);

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
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:flex-row" noValidate>
            <InputField
                name="name"
                label={
                    <>
                        <Trans id="add-healthcare-provider.input.name.label">Naam</Trans>
                        <span className="ml-1" aria-hidden="true">
                            <Trans id="common.required">(verplicht)</Trans>
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
                        <Trans id="add-healthcare-provider.input.city.label">Plaats</Trans>
                        <span className="ml-1" aria-hidden="true">
                            <Trans id="common.required">(verplicht)</Trans>
                        </span>
                    </>
                }
                value={formData.city}
                error={errorState.city}
                required
                onChange={handleChange}
            />
            <Button type="submit" className="h-16 px-12 md:mt-10">
                <Trans id="common.search">Zoeken</Trans>
            </Button>
        </form>
    );
};
