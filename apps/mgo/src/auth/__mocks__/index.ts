import { faker } from '$test/faker';
import { vi } from 'vitest';

export { type AuthState } from '../useAuth/useAuth';
export { VadAuthProvider } from '../VadAuthProvider/VadAuthProvider';

export const useAuth = vi.fn(() => faker.custom.authState());
