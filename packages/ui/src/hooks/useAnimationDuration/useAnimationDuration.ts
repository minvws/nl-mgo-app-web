import { useConfig } from '../useConfig/useConfig';

export function useAnimationDuration(value: number) {
    return useConfig().animations ? value : 0;
}
