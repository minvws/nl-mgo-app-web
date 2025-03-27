import {
    Context,
    DefinitionType,
    UnknownType,
    ts,
    type BaseType,
    type ChainNodeParser,
    type SubNodeParser,
} from 'ts-json-schema-generator';

/**
 * Attempts to parse generic type aliases.
 * E.g. Nullable<T> or ReturnType<T>.
 * It replaces the type value with the type value from the type checker.
 * @see: https://github.com/vega/ts-json-schema-generator?tab=readme-ov-file#custom-parsing
 * @see: https://github.com/vega/ts-json-schema-generator/issues/1887
 */
export class GenericTypeAliasParser implements SubNodeParser {
    constructor(
        private readonly program: ts.Program,
        private readonly chainNodeParser: ChainNodeParser
    ) {}

    supportsNode(node: ts.Node): boolean {
        return (
            node.kind === ts.SyntaxKind.TypeAliasDeclaration &&
            (node as any).type?.typeArguments?.length // eslint-disable-line @typescript-eslint/no-explicit-any
        );
    }

    createType(node: ts.TypeAliasDeclaration): BaseType {
        const name = node.name.escapedText as string;
        const typeChecker = this.program.getTypeChecker();
        const resolvedType = typeChecker.getTypeAtLocation(node);
        const typeNode = typeChecker.typeToTypeNode(
            resolvedType,
            undefined,
            1 /* NodeBuilderFlags.NoTruncation */
        );

        const jsonType = typeNode
            ? this.chainNodeParser.createType(typeNode, new Context())
            : new UnknownType();

        return new DefinitionType(name, jsonType);
    }
}
