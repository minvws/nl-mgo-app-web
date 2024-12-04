import { faker } from '$test';
import { type MockedFunction, expect, test, vi } from 'vitest';
import { date } from './date';
import { dateTime } from '../dateTime/dateTime';

const dateTimeMock = dateTime as MockedFunction<typeof dateTime>;

vi.mock('../dateTime/dateTime', () => ({
    dateTime: vi.fn(),
}));

test('format date uses the dateTime formatter', () => {
    const mockResult = faker.lorem.word();
    dateTimeMock.mockImplementationOnce(() => mockResult);

    const value = faker.fhir.date();
    const result = date(value);

    expect(dateTimeMock).toHaveBeenCalledWith(value);
    expect(result).toBe(mockResult);
});
