import { vi } from 'vitest';
import { LoadService } from '../load';

const loadService = {
    search: vi.fn(),
};

export function getLoadService(): LoadService {
    return loadService;
}
