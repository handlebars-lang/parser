import glob from "glob";
import path from "path";
import fs from "fs-extra";
import { safeLoad } from "js-yaml";
import { parse } from "handlebars";
import { asYaml } from "./lib/as-yaml";

const specFiles = glob.sync("**/*.yaml", { root: path.join(__dirname, "test-cases") });

if (specFiles.length === 0) {
    throw new Error("No specfiles found");
}
specFiles.forEach(file => {
    describe(file, () => {
        const specAsString = fs.readFileSync(file, "utf-8");
        const spec = safeLoad(specAsString);

        it(spec["description"], () => {
            const actualAst = parse(spec["template"], { srcName: "test.hbs" });
            const expectedAst = spec["expectedAst"];
            expect(asYaml(actualAst)).toEqual(asYaml(expectedAst));
        });
    });
});
