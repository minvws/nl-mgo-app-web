import { vi } from 'vitest';

type UseParams = (typeof import('$/routing/useParams'))['useParams'];

export const useParams: UseParams = vi.fn(() => ({}));
