import { vi } from 'vitest';

const loadService = {
    search: vi.fn(),
};

export function getLoadService() {
    return loadService;
}
