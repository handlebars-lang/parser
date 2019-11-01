import { AST } from "../../src";

export function Program(program: ProgramProperties, location: string): AST.Program {
    return { type: "Program", ...program, loc: buildLocation(location) };
}

interface ProgramProperties {
    body: AnyStatement[];
}

export function MustacheStatement(props: MustacheProperties, location: string): AST.MustacheStatement {
    return {
        type: "MustacheStatement",
        params: [],
        strip: NoStrip(),
        escaped: true,
        ...props,
        loc: buildLocation(location)
    };
}

export function PartialStatement(statement: PartialStatementProperties, location: string): AST.PartialStatement {
    return {
        type: "PartialStatement",
        params: [],
        strip: NoStrip(),
        indent: "",
        ...statement,
        loc: buildLocation(location)
    };
}

export interface PartialStatementProperties {
    name: AST.PathExpression | AST.SubExpression;
    params?: AnyExpression[];
    hash?: AST.Hash;
    indent?: string;
    strip?: StripFlags;
}

export function Decorator(props: MustacheProperties, location: string): AST.Decorator {
    return {
        type: "Decorator",
        params: [],
        strip: NoStrip(),
        escaped: true,
        ...props,
        loc: buildLocation(location)
    };
}

interface MustacheProperties {
    path: AST.PathExpression | AnyLiteral;
    params?: AnyExpression[];
    hash?: AST.Hash;
    escaped?: boolean;
    strip?: StripFlags;
}

export function BlockStatement(props: BlockProperties, location: string): AST.BlockStatement {
    return {
        type: "BlockStatement",
        params: [],
        openStrip: NoStrip(),
        closeStrip: NoStrip(),
        ...props,
        loc: buildLocation(location)
    };
}

interface BlockProperties {
    path: AST.PathExpression;
    params?: AnyExpression[];
    hash?: AST.Hash;
    program: AST.Program;
    inverse?: AST.Program;
    openStrip: StripFlags;
    inverseStrip?: StripFlags;
    closeStrip: StripFlags;
}

export function DecoratorBlock(props: DecoratorBlockProperties, location: string): AST.DecoratorBlock {
    return {
        type: "DecoratorBlock",
        params: [],
        openStrip: NoStrip(),
        closeStrip: NoStrip(),
        ...props,
        loc: buildLocation(location)
    };
}

interface DecoratorBlockProperties {
    path: AST.PathExpression;
    params?: AnyExpression[];
    hash?: AST.Hash;
    program: AST.Program;
    openStrip?: StripFlags;
    closeStrip?: StripFlags;
}

export function PartialBlockStatement(props: PartialBlockProperties, location: string): AST.PartialBlockStatement {
    return {
        type: "PartialBlockStatement",
        params: [],
        openStrip: NoStrip(),
        closeStrip: NoStrip(),
        ...props,
        loc: buildLocation(location)
    };
}

export interface PartialBlockProperties {
    name: AST.PathExpression | AST.SubExpression;
    params?: AnyExpression[];
    hash?: AST.Hash;
    program: AST.Program;
    openStrip?: StripFlags;
    closeStrip?: StripFlags;
}

export function ContentStatement(statement: ContentProperties, location: string): AST.ContentStatement {
    return {
        type: "ContentStatement",
        ...statement,
        loc: buildLocation(location)
    };
}

interface ContentProperties {
    value: string;
    original: string;
}

export function CommentStatement(statement: CommentProperties, location: string): AST.CommentStatement {
    return {
        type: "CommentStatement",
        strip: NoStrip(),
        ...statement,
        loc: buildLocation(location)
    };
}

export interface CommentProperties {
    value: string;
    strip?: StripFlags;
}

export function PathExpression(props: PathExpressionProperties, location: string): AST.PathExpression {
    return {
        type: "PathExpression",
        data: false,
        depth: 0,
        ...props,
        loc: buildLocation(location)
    };
}

export interface PathExpressionProperties {
    data?: boolean;
    depth?: number;
    parts: string[];
    original: string;
}

export function SubExpression(props: SubExpressionProperties, location: string): AST.SubExpression {
    return {
        type: "SubExpression",
        params: [],
        ...props,
        loc: buildLocation(location)
    };
}

export interface SubExpressionProperties {
    path: AST.PathExpression;
    params?: AnyExpression[];
    hash?: AST.Hash;
}

export function StringLiteral(props: StringLiteralProperties, location: string): AST.StringLiteral {
    return {
        type: "StringLiteral",
        ...props,
        loc: buildLocation(location)
    };
}

export interface StringLiteralProperties {
    value: string;
    original: string;
}

export function NumberLiteral(props: NumberLiteral, location: string): AST.NumberLiteral {
    return {
        type: "NumberLiteral",
        ...props,
        loc: buildLocation(location)
    };
}

export interface NumberLiteral {
    value: number;
    original: number;
}

export function BooleanLiteral(props: BooleanLiteralProperties, location: string): AST.BooleanLiteral {
    return {
        type: "BooleanLiteral",
        ...props,
        loc: buildLocation(location)
    };
}

export interface BooleanLiteralProperties {
    value: boolean;
    original: boolean;
}

export function UndefinedLiteral(location: string): AST.UndefinedLiteral {
    return {
        type: "UndefinedLiteral",
        loc: buildLocation(location)
    };
}

export function NullLiteral(location: string): AST.UndefinedLiteral {
    return {
        type: "UndefinedLiteral",
        loc: buildLocation(location)
    };
}

export function Hash(props: HashProperties, location: string): AST.Hash {
    return {
        type: "Hash",
        ...props,
        loc: buildLocation(location)
    };
}

export interface HashProperties {
    pairs: AST.HashPair[];
}

export function HashPair(hashPair: HashPairProperties, location: string): AST.HashPair {
    return {
        type: "HashPair",
        ...hashPair,
        loc: buildLocation(location)
    };
}

export interface HashPairProperties {
    key: string;
    value: AnyExpression;
}

function buildLocation(location?: string, source?: string): AST.SourceLocation {
    return {
        source: source || "",
        start: { column: 0, line: 0 },
        end: { column: 0, line: 0 }
    };
}

function NoStrip(): StripFlags {
    return { open: false, close: false };
}

export type AnyStatement =
    | AST.MustacheStatement
    | AST.Decorator
    | AST.BlockStatement
    | AST.PartialStatement
    | AST.PartialBlockStatement
    | AST.CommentStatement
    | AST.DecoratorBlock
    | AST.CommentStatement;

export type AnyExpression = AnyLiteral | AST.SubExpression | AST.PathExpression;

export type AnyLiteral =
    | AST.BooleanLiteral
    | AST.StringLiteral
    | AST.NumberLiteral
    | AST.NullLiteral
    | AST.UndefinedLiteral;

export interface StripFlags {
    open: boolean;
    close: boolean;
}
