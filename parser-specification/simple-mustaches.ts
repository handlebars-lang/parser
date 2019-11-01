import { BuildAST } from "./lib/ast-builder";

describe("simple mustache", () => {
  it("should", () => {
    BuildAST.Program(
      {
        body: [
          BuildAST.MustacheStatement(
            {
              path: BuildAST.PathExpression({ data: true, depth: 0, original: "", parts: [] }, ""),
              params: [],
              hash: BuildAST.Hash({ pairs: [] }, ""),
              escaped: true,
              strip: { open: false, close: false }
            },
            ""
          )
        ],
        blockParams: ["a", "b"]
      },
      ""
    );
  });
});
