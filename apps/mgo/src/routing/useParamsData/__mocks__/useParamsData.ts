import { vi } from 'vitest';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
type UseParamsData = (typeof import('$/routing/useParamsData/useParamsData'))['useParamsData'];

export const useParamsData: UseParamsData = vi.fn(() => ({
    organization: undefined,
    healthCategory: undefined,
    resource: undefined,
}));
