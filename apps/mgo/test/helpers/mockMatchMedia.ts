import { vi } from 'vitest';

export function mockMatchMedia(matchingQueries: string[] = []) {
    Object.defineProperty(window, 'matchMedia', {
        value: vi.fn((query: string) => {
            return {
                matches: matchingQueries.includes(query),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
            };
        }),
    });
}
