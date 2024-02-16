export interface WithUse {
    use?: string;
}

export function findByUse<T extends WithUse, Use extends T['use']>(
    collection: T[] | undefined,
    priority: (Use | undefined)[],
    defaultValue?: T
) {
    if (!collection?.length) return defaultValue;

    for (const use of priority) {
        const item = collection.find((x) => x.use === use);
        if (item) return item;
    }

    return defaultValue;
}
