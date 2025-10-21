import { getPatientFriendlyTerms } from '$/services/pft/pftService';
import { useQuery } from '@tanstack/react-query';

export function usePft({ code, system }: { code?: string; system?: string } = {}) {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['pvt'],
        queryFn: getPatientFriendlyTerms,
        staleTime: Infinity,
        select: (data) => {
            if (!code || system !== 'http://snomed.info/sct') {
                return;
            }
            return data?.[code];
        },
    });

    return {
        isLoading,
        isError,
        pft: data,
    };
}
