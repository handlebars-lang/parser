/* eslint-disable @typescript-eslint/no-empty-interface,@typescript-eslint/no-namespace */
export namespace AST {
    export interface Node {
        type: string;
        loc: SourceLocation;
    }

    export interface Program extends Node {
        body: Statement[];
        strip?: {};
    }

    export interface Statement extends Node {}

    export interface SourceLocation {
        /**
         * The name of the source-file of this node
         */
        source: string;
        start: Position;
        end: Position;
    }

    export interface Position {
        line: number;
        column: number;
    }

    export interface MustacheStatement extends Statement {
        type: "MustacheStatement";
        path: PathExpression | Literal;
        params: Expression[];
        hash?: Hash;
        escaped: boolean;
        strip: StripFlags;
    }

    export interface Decorator extends Statement {
        type: "Decorator";
        path: PathExpression | Literal;
        params: Expression[];
        hash?: Hash;
        escaped: boolean;
        strip: StripFlags;
    }

    export interface BlockStatement extends Statement {
        type: "BlockStatement";
        path: PathExpression;
        params: Expression[];
        hash?: Hash;
        program: Program;
        inverse?: Program;
        openStrip: StripFlags;
        inverseStrip?: StripFlags;
        closeStrip: StripFlags;
    }

    export interface DecoratorBlock extends Statement {
        type: "DecoratorBlock";
        path: PathExpression;
        params: Expression[];
        hash?: Hash;
        program: Program;
        openStrip: StripFlags;
        closeStrip: StripFlags;
    }

    export interface PartialStatement extends Statement {
        type: "PartialStatement";
        name: PathExpression | SubExpression;
        params: Expression[];
        hash?: Hash;
        indent: string;
        strip: StripFlags;
    }

    export interface PartialBlockStatement extends Statement {
        type: "PartialBlockStatement";
        name: PathExpression | SubExpression;
        params: Expression[];
        hash?: Hash;
        program: Program;
        openStrip: StripFlags;
        closeStrip: StripFlags;
    }

    export interface ContentStatement extends Statement {
        type: "ContentStatement";
        value: string;
        original: string;
    }

    export interface CommentStatement extends Statement {
        type: "CommentStatement";
        value: string;
        strip: StripFlags;
    }

    export interface Expression extends Node {}

    export interface SubExpression extends Expression {
        type: "SubExpression";
        path: PathExpression;
        params: Expression[];
        hash?: Hash;
    }

    export interface PathExpression extends Expression {
        type: "PathExpression";
        data: boolean;
        depth: number;
        parts: string[];
        original: string;
    }

    export interface Literal extends Expression {}

    export interface StringLiteral extends Literal {
        type: "StringLiteral";
        value: string;
        original: string;
    }

    export interface BooleanLiteral extends Literal {
        type: "BooleanLiteral";
        value: boolean;
        original: boolean;
    }

    export interface NumberLiteral extends Literal {
        type: "NumberLiteral";
        value: number;
        original: number;
    }

    export interface UndefinedLiteral extends Literal {
        type: "UndefinedLiteral";
    }

    export interface NullLiteral extends Literal {
        type: "NullLiteral";
    }

    export interface Hash extends Node {
        type: "Hash";
        pairs: HashPair[];
    }

    export interface HashPair extends Node {
        type: "HashPair";
        key: string;
        value: Expression;
    }

    export interface StripFlags {
        open: boolean;
        close: boolean;
    }
}
