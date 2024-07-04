import { useSearchParams } from 'react-router-dom';

export type AuthErrorState = {
    error: string | null;
    description: string | null;
};

export function useAuthError(): AuthErrorState | null {
    const [searchParams] = useSearchParams();

    if (searchParams.has('error')) {
        return {
            error: searchParams.get('error'),
            description: searchParams.get('error_description'),
        };
    }

    return null;
}
