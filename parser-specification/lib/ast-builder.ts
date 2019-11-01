import { AST } from "../../src";

export namespace BuildAST {
    export function Program(program: Specified.Program, location: string): AST.Program {
        return {
            type: "Program",
            ...program,
            loc: buildLocation(location)
        };
    }

    export function MustacheStatement(statement: Specified.MustacheStatement, location: string): AST.MustacheStatement {
        return {
            type: "MustacheStatement",
            ...statement,
            loc: buildLocation(location)
        };
    }

    export function ContentStatement(statement: Specified.ContentStatement, location: string): AST.ContentStatement {
        return {
            type: "ContentStatement",
            ...statement,
            loc: buildLocation(location)
        };
    }

    export function PathExpression(pathExpression: Specified.PathExpression, location: string): AST.PathExpression {
        return {
            type: "PathExpression",
            ...pathExpression,
            loc: buildLocation(location)
        };
    }

    export function SubExpression(subExpression: Specified.SubExpression, location: string): AST.SubExpression {
        return {
            type: "SubExpression",
            ...subExpression,
            loc: buildLocation(location)
        };
    }

    export function StringLiteral(stringLiteral: Specified.StringLiteral, location: string): AST.StringLiteral {
        return {
            type: "StringLiteral",
            ...stringLiteral,
            loc: buildLocation(location)
        };
    }

    export function NumberLiteral(numberLiteral: Specified.NumberLiteral, location: string): AST.NumberLiteral {
        return {
            type: "NumberLiteral",
            ...numberLiteral,
            loc: buildLocation(location)
        };
    }

    export function BooleanLiteral(booleanLiteral: Specified.BooleanLiteral, location: string): AST.BooleanLiteral {
        return {
            type: "BooleanLiteral",
            ...booleanLiteral,
            loc: buildLocation(location)
        };
    }

    export function UndefinedLiteral(
        undefinedLiteral: Specified.UndefinedLiteral,
        location: string
    ): AST.UndefinedLiteral {
        return {
            type: "UndefinedLiteral",
            ...undefinedLiteral,
            loc: buildLocation(location)
        };
    }
    export function Hash(hash: Specified.Hash, location: string): AST.Hash {
        return {
            type: "Hash",
            ...hash,
            loc: buildLocation(location)
        };
    }
    export function HashPair(hashPair: Specified.HashPair, location: string): AST.HashPair {
        return {
            type: "HashPair",
            ...hashPair,
            loc: buildLocation(location)
        };
    }

    function buildLocation(location: string, source?: string): AST.SourceLocation {
        return {
            source: source || "",
            start: { column: 0, line: 0 },
            end: { column: 0, line: 0 }
        };
    }
}

export namespace Specified {
    export interface Node {}

    export type NodeTypes = StatementTypes | ExpressionTypes | AST.Program | Hash | HashPair;

    export type StatementTypes =
        | AST.MustacheStatement
        | AST.Decorator
        | AST.BlockStatement
        | AST.PartialStatement
        | AST.PartialBlockStatement
        | AST.CommentStatement
        | AST.DecoratorBlock
        | AST.CommentStatement;

    export type ExpressionTypes = LiteralTypes | AST.SubExpression | AST.PathExpression;

    export type LiteralTypes =
        | AST.BooleanLiteral
        | AST.StringLiteral
        | AST.NumberLiteral
        | AST.NullLiteral
        | AST.UndefinedLiteral;

    export interface Program extends Node {
        body: StatementTypes[];
        blockParams: string[];
    }

    export interface AbstractMustache extends Node {
        path: AST.PathExpression | LiteralTypes;
        params: ExpressionTypes[];
        hash: AST.Hash;
        escaped: boolean;
        strip: StripFlags;
    }

    export interface MustacheStatement extends AbstractMustache {}

    export interface Decorator extends AbstractMustache {}

    interface AbstractBlock extends Node {
        path: AST.PathExpression;
        params: ExpressionTypes[];
        hash: AST.Hash;
        program: AST.Program;
        inverse: AST.Program;
        openStrip: StripFlags;
        inverseStrip: StripFlags;
        closeStrip: StripFlags;
    }

    export interface BlockStatement extends AbstractBlock {}

    export interface DecoratorBlock extends AbstractBlock {}

    export interface PartialStatement extends Node {
        name: AST.PathExpression | AST.SubExpression;
        params: ExpressionTypes[];
        hash: Hash;
        indent: string;
        strip: StripFlags;
    }

    export interface PartialBlockStatement extends Node {
        name: AST.PathExpression | AST.SubExpression;
        params: ExpressionTypes[];
        hash: Hash;
        program: AST.Program;
        openStrip: StripFlags;
        closeStrip: StripFlags;
    }

    export interface CommentStatement extends Node {
        value: string;
        strip: StripFlags;
    }

    export interface ContentStatement extends Node {
        value: string;
        original: StripFlags;
    }

    export interface SubExpression extends Node {
        path: AST.PathExpression;
        params: ExpressionTypes[];
        hash: AST.Hash;
    }

    export interface PathExpression extends Node {
        data: boolean;
        depth: number;
        parts: string[];
        original: string;
    }

    export interface StringLiteral extends Node {
        value: string;
        original: string;
    }

    export interface BooleanLiteral extends Node {
        value: boolean;
        original: boolean;
    }

    export interface NumberLiteral extends Node {
        value: number;
        original: number;
    }

    export interface UndefinedLiteral extends Node {}

    export interface NullLiteral extends Node {}

    export interface Hash extends Node {
        pairs: AST.HashPair[];
    }

    export interface HashPair extends Node {
        key: string;
        value: ExpressionTypes;
    }

    export interface StripFlags {
        open: boolean;
        close: boolean;
    }
}
