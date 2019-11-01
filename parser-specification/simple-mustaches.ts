import { Program, Hash, MustacheStatement, PathExpression } from "./lib/ast-builder";

describe("simple mustache", () => {
    it("should", () => {
        Program(
            {
                body: [
                    MustacheStatement(
                        {
                            path: PathExpression({ data: true, depth: 0, original: "", parts: [] }, ""),
                            params: [],
                            hash: Hash({ pairs: [] }, ""),
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
