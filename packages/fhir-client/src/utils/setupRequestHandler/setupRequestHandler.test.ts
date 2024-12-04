import { expect, test, vi } from 'vitest';
import { setupRequestHandler, type FhirRequestHandler } from './setupRequestHandler';
import { type KyInstance, type Options } from 'ky';
import { type FhirClientOptions } from '../../types';
// import { type KyOptions } from 'ky';

test('setupRequestHandler provides the instance and fhirOptions to the request method', () => {
    const method: FhirRequestHandler<unknown, unknown> = vi.fn();
    const instance = {} as KyInstance;
    const fhirOptions = {} as FhirClientOptions;
    const kyOptions = {} as Options;

    const handler = setupRequestHandler(method, instance, fhirOptions);

    expect(method).not.toHaveBeenCalled();

    handler('request', kyOptions);

    expect(method).toHaveBeenCalledWith(instance, fhirOptions, 'request', kyOptions);
});
