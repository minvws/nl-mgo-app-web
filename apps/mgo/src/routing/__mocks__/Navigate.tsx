import { vi } from 'vitest';
import { type NavigateProps } from '../Navigate';

export const Navigate = vi.fn((_props: NavigateProps) => undefined);
