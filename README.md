# parser
The parser for the handlebars-language (work in progress)

# Steps to completion

1. [ ] Write a framework for parser tests (partially done)
2. [ ] Write parser tests to cover all relevant template variations, using the current parser as reference
3. [ ] Implement a parser

# Thoughts on the architecture

The parser should not be based on jison but use plain TypeScript. Debugging jison was a pain in the past and I think that by 
writing it without a framework, it can be made cleaner and better debuggable.

A complete set of tests will also enable other people to write their own parsers that are possibly faster than this one.

# Goals

* Clean code, easy to understand code
* Size does not matter that much here. In my opinion, there are few use-cases for using the parser itself in the browser. Parsing and compiling templates is usually done in a Node.js environment. It makes sense not to use too many large dependencies, but we don't need to save every byte possible in the final build artifact.
* Performance is an issue, but not the primary one at the moment. Optimizations can be done later.

