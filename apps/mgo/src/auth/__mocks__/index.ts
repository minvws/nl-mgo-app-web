import { faker } from '$test/faker';
import { vi } from 'vitest';

export { VadAuthProvider } from '../VadAuthProvider/VadAuthProvider.tsx';
export { type AuthState } from '../useAuth/useAuth';

export const useAuth = vi.fn(() => faker.custom.authState());
