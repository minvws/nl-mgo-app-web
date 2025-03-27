export interface ValueType<T extends string> {
    _type: T;
}

export interface PrimitiveValueType<T extends string, V> {
    _type: T;
    value: V;
}
