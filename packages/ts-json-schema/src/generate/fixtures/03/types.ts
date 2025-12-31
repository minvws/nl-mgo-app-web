export interface Box<T> {
    value: T;
}

export type ValueA = {
    a: Box<string>;
    b: Box<number>;
};

export type ValueB = {
    a: Box<string>;
    nested: Box<Box<string>>;
};
