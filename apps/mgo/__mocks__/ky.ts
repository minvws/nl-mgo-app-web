import type { KyInstance } from 'ky';
import { vi, type Mock } from 'vitest';

type MockKyResponse = {
    json: <T = unknown>() => Promise<T>;
};

type MockKyMethod = (...args: unknown[]) => MockKyResponse;

export const mockKyGet: Mock<MockKyMethod> = vi.fn();
const unsupportedKyMethod = vi.fn(() => {
    throw new Error('Unsupported ky method in test. Only ky.get is mocked here.');
});

const mockKyCreate: Mock = vi.fn(() => ({
    get: mockKyGet,
}));
const mockKyExtend: Mock = vi.fn(() => ({
    get: mockKyGet,
}));

export function mockKyGetJson(url: string, value: unknown) {
    mockKyGet.mockImplementation((requestedUrl: unknown) => {
        if (requestedUrl !== url) {
            throw new Error(
                `Unexpected ky.get url. Expected "${url}", received "${String(requestedUrl)}"`
            );
        }

        return {
            json: vi.fn().mockResolvedValue(value),
        };
    });
}

export function resetKyMocks() {
    mockKyGet.mockReset();
    unsupportedKyMethod.mockClear();
    mockKyCreate.mockReset();
    mockKyExtend.mockClear();
}

const kyMock: Partial<KyInstance> = {
    get: mockKyGet as unknown as KyInstance['get'],
    post: unsupportedKyMethod as unknown as KyInstance['post'],
    create: mockKyCreate as unknown as KyInstance['create'],
    extend: mockKyExtend as unknown as KyInstance['extend'],
};

export default kyMock; // eslint-disable-line import/no-default-export
