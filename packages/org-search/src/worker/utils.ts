export type ResponseType<T extends string> = `${T}-response`;

let nextId = 0;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Func = (arg: any) => unknown;

export function setupAsyncWorkerFunction<T extends string, F extends Func>(
    worker: Worker | undefined,
    requestType: T
) {
    return function workerFunction(arg: Parameters<F>[0]) {
        return postRequestAndWaitForResponse<T, F>(worker, requestType, arg);
    };
}

function postRequestAndWaitForResponse<T extends string, F extends Func>(
    worker: Worker | undefined,
    requestType: T,
    payload: Parameters<F>[0]
): Promise<Awaited<ReturnType<F>>> {
    const requestId = nextId++;
    return new Promise((resolve, reject) => {
        if (!worker) {
            return reject(new Error('Worker not available'));
        }

        const handler = (
            event: MessageEvent<{ requestId: number; type: string; payload: ReturnType<F> }>
        ) => {
            if (event.data.type !== (`${requestType}-response` satisfies ResponseType<T>)) return;
            if (event.data.requestId !== requestId) return;
            worker.removeEventListener('message', handler);
            resolve(event.data.payload as Awaited<ReturnType<F>>);
        };

        worker.addEventListener('message', handler);
        worker.postMessage({
            type: requestType,
            payload,
            requestId,
        });
    });
}
