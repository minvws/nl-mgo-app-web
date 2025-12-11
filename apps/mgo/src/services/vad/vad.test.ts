import { appConfig } from '$/config';
import { faker } from '$test/faker';
import ky, { type ResponsePromise } from 'ky';
import { afterEach, expect, test, vi, type MockedFunction } from 'vitest';
import { getAuthUrl } from './vad';

vi.mock('ky', async (importActual) => {
    const mod = await importActual<typeof import('ky')>();
    return {
        default: {
            ...mod,
            post: vi.fn(),
        },
    };
});

const mockPost = ky.post as MockedFunction<(typeof ky)['post']>;

afterEach(() => {
    vi.clearAllMocks();
});

test('getAuthUrl calls oidc/start', async () => {
    const expectedResult = faker.lorem.word();

    mockPost.mockImplementation(
        () =>
            ({
                json: () => Promise.resolve(expectedResult),
            }) as ResponsePromise
    );

    const callbackUrl = faker.internet.url();

    const result = await getAuthUrl({ callbackUrl });
    expect(ky.post).toHaveBeenCalledWith('oidc/start', {
        prefixUrl: appConfig.dva_url,
        json: { client_callback_url: callbackUrl },
    });
    expect(result).toBe(expectedResult);
});
