type AbstractType = {
    id: string;
};

type ParserFunction = <T extends AbstractType>(value: T) => T & { parsed: boolean };

export type ParsedAbstractType = ReturnType<ParserFunction>;
