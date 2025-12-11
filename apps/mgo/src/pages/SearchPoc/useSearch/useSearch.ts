/* c8 ignore start - this is only a POC */
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import type { OrganizationItem } from './types';

const validFiles = ['original', '10k', '30k', '60k', '100k'];

const validEngines = ['flexsearch', 'flexsearch-ext', 'orama', 'orama-ext', 'fuse'];
export type SearchEngine = (typeof validEngines)[number];

export interface SearchOptions {
    engine: SearchEngine;
    file: string;
}

let nextId = 0;

export type MetaData = {
    engine: SearchEngine;
    file: string;
    loadingTime: number;
    indexingTime: number;
};

export function useSearch({ file, engine }: SearchOptions) {
    const searchWorker = useRef<Worker>();
    const [data, setData] = useState<Record<string, OrganizationItem>>({});

    const engineUsed = validEngines.includes(engine) ? engine : 'flexsearch';

    let fileToUse = file;
    if (!validFiles.includes(file)) {
        console.error(`file: "${file}" is not a valid file, defaulting to 10k`);
        fileToUse = 'original';
    }

    const [metaData, setMetaData] = useState<MetaData>({
        loadingTime: -1,
        indexingTime: -1,
        engine: engineUsed,
        file: fileToUse,
    });

    useEffect(() => {
        switch (engineUsed) {
            case 'flexsearch':
                searchWorker.current = new Worker(
                    new URL('./searchWorkerFlex.ts', import.meta.url),
                    {
                        type: 'module',
                    }
                );
                break;
            case 'flexsearch-ext':
                searchWorker.current = new Worker(
                    new URL('./searchWorkerFlexExt.ts', import.meta.url),
                    {
                        type: 'module',
                    }
                );
                break;
            case 'orama':
                searchWorker.current = new Worker(
                    new URL('./searchWorkerOrama.ts', import.meta.url),
                    {
                        type: 'module',
                    }
                );
                break;
            case 'orama-ext':
                searchWorker.current = new Worker(
                    new URL('./searchWorkerOramaExt.ts', import.meta.url),
                    {
                        type: 'module',
                    }
                );
                break;
            case 'fuse':
                searchWorker.current = new Worker(
                    new URL('./searchWorkerFuse.ts', import.meta.url),
                    {
                        type: 'module',
                    }
                );
                break;
        }
        return () => {
            searchWorker.current?.terminate();
        };
    }, [engineUsed]);

    const indexMutation = useMutation({
        mutationFn: async (file: string) => {
            let start = performance.now();
            let mod: { default: OrganizationItem[] } | undefined;

            if (file === 'original') {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore - these json files are too large to include in the tsconfig
                mod = await import(`../data/providers-normalized.json`);
            } else {
                mod = await import(`../data/fake-normalized-${file}.json`);
            }
            const data = mod!.default as OrganizationItem[];
            const loadingTime = performance.now() - start;

            start = performance.now();
            await createIndex(data);
            const indexingTime = performance.now() - start;

            const indexedData = data.reduce(
                (acc, item) => {
                    acc[item.id] = item;
                    return acc;
                },
                {} as Record<string, OrganizationItem>
            );

            setData(indexedData);
            setMetaData((prev) => ({ ...prev, loadingTime, indexingTime }));
        },
    });

    useEffect(() => {
        indexMutation.mutate(fileToUse);
    }, [file, fileToUse]);

    function setupAsyncWorkerFunction<Req, Res>(requestType: string) {
        return function workerFunction(payload: Req): Promise<Res> {
            return postRequestAndWaitForResponse<Req, Res>(
                searchWorker.current,
                requestType,
                payload
            );
        };
    }

    const createIndex = setupAsyncWorkerFunction<OrganizationItem[], string[]>('create-index');
    const search = setupAsyncWorkerFunction<{ query: string }, string[]>('search');

    return { search, loading: !indexMutation.isSuccess, data, metaData };
}

function postRequestAndWaitForResponse<Req, Res>(
    worker: Worker | undefined,
    requestType: string,
    payload: Req
): Promise<Res> {
    const requestId = nextId++;
    return new Promise((resolve, reject) => {
        if (!worker) {
            return reject(new Error('Worker not available'));
        }

        const handler = (
            event: MessageEvent<{ requestId: number; type: string; payload: Res }>
        ) => {
            if (event.data.type !== `${requestType}-response`) return;
            if (event.data.requestId !== requestId) return;
            worker.removeEventListener('message', handler);
            resolve(event.data.payload as Res);
        };
        worker.addEventListener('message', handler);
        worker.postMessage({
            type: requestType,
            payload,
            requestId,
        });
    });
}
