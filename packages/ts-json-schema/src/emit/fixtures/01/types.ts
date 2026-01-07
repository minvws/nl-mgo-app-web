export interface InterfaceA {
    name: string;
    age: number;
}

export interface InterfaceExtendedA extends InterfaceA {
    extended: boolean;
}

export type TypeA = {
    a: string;
    b: number;
};

export type TypeB = TypeA & {
    c: boolean;
};
