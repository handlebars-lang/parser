import glob from "glob";
import path from "path";
import fs from "fs-extra";
import { safeLoad } from "js-yaml";
import Ajv from "ajv";

const ajv = new Ajv();
const schemaFilename = path.resolve(__dirname, "lib", "ast-spec.schema.json");
const schemaAsString: string = fs.readFileSync(schemaFilename, "utf-8");
const validateSpec = ajv.compile(JSON.parse(schemaAsString));

const specFiles = glob.sync("**/*.yaml", { root: path.join(__dirname, "test-cases") });

specFiles.forEach(file => {
    describe(file, () => {
        it("validate spec", () => {
            const specAsString = fs.readFileSync(file, "utf-8");
            const spec = safeLoad(specAsString);

            if (!validateSpec(spec)) {
                fail(validateSpec.errors);
            }
        });
    });
});
