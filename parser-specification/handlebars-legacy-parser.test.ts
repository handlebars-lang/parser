import glob from "glob";
import path from "path";
import fs from "fs-extra";
import { safeLoad, safeDump } from "js-yaml";
import { parse } from "handlebars";

const specFiles = glob.sync("**/*.yaml", { root: path.join(__dirname, "test-cases") });

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

function asYaml(actualAst: hbs.AST.Program): string {
    return safeDump(actualAst, {
        skipInvalid: true,
        sortKeys: (prop1: string, prop2: string) => {
            const order1 = orderKeyForPropertyName(prop1);
            const order2 = orderKeyForPropertyName(prop2);
            if (order1 == order2) {
                return 0;
            }
            return order1 < order2 ? -1 : 1;
        }
    });
}

function orderKeyForPropertyName(propertyName: string): string {
    const specialPropertyOrder = ["type", "loc", "start", "end", "line", "column"].indexOf(propertyName);
    if (specialPropertyOrder >= 0) {
        return String(specialPropertyOrder);
    }
    return propertyName;
}
