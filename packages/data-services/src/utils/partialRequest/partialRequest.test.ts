import { expect, test, vi, type MockInstance } from 'vitest';
import { partialRequest } from './partialRequest';

test('partialRequest provides a fixed request object', () => {
    const method = vi.fn();
    const request = { foo: 'bar' };

    const requestMethod = partialRequest(method, request);

    requestMethod();

    expect(method).toHaveBeenCalledOnce();
    const [requestData, requestOptions] = (method as MockInstance).mock.calls[0];
    expect(requestData).toBe(request);
    expect(requestOptions).toEqual({ searchParams: new URLSearchParams() });
});

test('partialRequest returns reponse data', () => {
    const request = { foo: 'bar' };
    const response = { beep: 'bop' };
    const method = vi.fn(() => response);

    const requestMethod = partialRequest(method, request);
    const responseData = requestMethod();

    expect(method).toHaveBeenCalledOnce();
    const [requestData] = (method as MockInstance).mock.calls[0];
    expect(requestData).toBe(request);
    expect(responseData).toBe(response);
});

test('partialRequest provides a fixed request object and default search params', () => {
    const method = vi.fn();
    const request = { foo: 'bar' };
    const defaultOptions = { searchParams: { beep: 'bop' } };

    const requestMethod = partialRequest(method, request, defaultOptions);

    requestMethod();

    expect(method).toHaveBeenCalledOnce();
    const [requestData, requestOptions] = (method as MockInstance).mock.calls[0];
    expect(requestData).toBe(request);
    expect(requestOptions).toEqual({ searchParams: new URLSearchParams({ beep: 'bop' }) });
});

test('partialRequest provides a fixed request object and merges default and new search params', () => {
    const method = vi.fn();
    const request = { foo: 'bar' };
    const defaultOptions = { searchParams: { boop: 'baap', beep: 'bop' } };

    const requestMethod = partialRequest(method, request, defaultOptions);

    requestMethod({
        searchParams: {
            beep: 'boing',
            bop: 'ben',
        },
    });

    expect(method).toHaveBeenCalledOnce();
    const [requestData, requestOptions] = (method as MockInstance).mock.calls[0];
    expect(requestData).toBe(request);
    expect(requestOptions).toEqual({
        searchParams: new URLSearchParams({ boop: 'baap', beep: 'boing', bop: 'ben' }),
    });
});
