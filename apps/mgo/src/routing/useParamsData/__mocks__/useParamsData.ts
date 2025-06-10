import { vi } from 'vitest';

type UseParamsData = (typeof import('$/routing/useParamsData/useParamsData'))['useParamsData'];

export const useParamsData: UseParamsData = vi.fn(() => ({
    organization: undefined,
    healthCategory: undefined,
    resource: undefined,
}));
