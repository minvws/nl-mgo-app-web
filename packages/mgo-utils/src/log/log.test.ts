import { faker } from '@faker-js/faker';
import { afterEach, expect, test, vi } from 'vitest';
import { log } from './log';

afterEach(() => {
    vi.unstubAllEnvs();
});

test('warning is only logged during DEV mode', () => {
    const mockWarningLog = vi.spyOn(console, 'warn');
    mockWarningLog.mockImplementationOnce(() => {});

    vi.stubEnv('DEV', false);
    let message = faker.lorem.sentence();
    log.warn(message);
    expect(mockWarningLog).not.toBeCalledWith(message);

    vi.stubEnv('DEV', true);
    message = faker.lorem.sentence();
    log.warn(message);
    expect(mockWarningLog).toBeCalledWith(message);
});

test('error is only logged during DEV mode', () => {
    const mockErrorLog = vi.spyOn(console, 'error');
    mockErrorLog.mockImplementationOnce(() => {});

    vi.stubEnv('DEV', false);
    let message = faker.lorem.sentence();
    log.error(message);
    expect(mockErrorLog).not.toBeCalledWith(message);

    vi.stubEnv('DEV', true);
    message = faker.lorem.sentence();
    log.error(message);
    expect(mockErrorLog).toBeCalledWith(message);
});
