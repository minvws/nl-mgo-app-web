import { type DefaultError } from '@tanstack/react-query';

export interface DefaultErrorProps<TError> {
    error: TError | null;
}

export function DefaultError<TError>(_props: DefaultErrorProps<TError>) {
    return <div className="py-6">Er ging iets mis</div>;
}
