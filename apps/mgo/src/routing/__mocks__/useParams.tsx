import { vi } from 'vitest';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
type UseParams = (typeof import('$/routing/useParams'))['useParams'];

export const useParams: UseParams = vi.fn(() => ({}));
