import { AST } from "./ast/ast";

export { AST } from './ast/ast'

export function parse(template: string, options?: ParserOptions): AST.Program {
    return {
        type: 'Program',
        body: [],
        blockParams: [],
        loc: {
            start: { column: 1, line: 1},
            end: { column: 1, line: 1},
            source: 'abc'
        }
    }
}

export interface ParserOptions {

}