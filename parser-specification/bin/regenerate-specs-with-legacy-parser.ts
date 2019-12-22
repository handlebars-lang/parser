/* eslint-disable @typescript-eslint/no-explicit-any */
import { asYaml } from "../lib/as-yaml";
import glob from "glob";
import path from "path";
import { safeLoad } from "js-yaml";
import { parse } from "handlebars";
import fs from "fs-extra";
import prettier, { Options } from "prettier";

const testCaseDir = path.resolve(__dirname, "test-cases");

console.log('Updating expected output of all test-cases in the "parser-specification/test-cases" directory');

const specFiles = glob.sync("**/*.yaml", { root: testCaseDir });

specFiles.forEach(file => {
    updateSpecFile(file).catch(err => console.error(`Unexpected error when updating file "${file}`, err));
});

async function updateSpecFile(file: string): Promise<void> {
    const prettierConfig = await prettier.resolveConfig(file);
    if (prettierConfig == null) {
        throw new Error(`No prettier config resolved for file "${file}}"`);
    }
    const specAsYamlString = await fs.readFile(file, "utf-8");
    const updateSpecAsYamlString = buildUpdatedSpecYaml(specAsYamlString, prettierConfig);
    if (updateSpecAsYamlString !== specAsYamlString) {
        await fs.writeFile(file, updateSpecAsYamlString);
        console.log(`updated ${file}`);
    } else {
        console.log(`file ${file} is unchanged`);
    }
}

function buildUpdatedSpecYaml(specAsYamlString: string, prettierConfig?: Options): string {
    const spec = safeLoad(specAsYamlString);
    updateSpecObject(spec);
    const updatedSpecAsString = asYaml(spec);
    return prettier.format(updatedSpecAsString, { ...prettierConfig, parser: "yaml" });
}

function updateSpecObject(spec: any): void {
    try {
        spec["expectedAst"] = parse(spec["template"], { srcName: "test.hbs" });
        delete spec["expectedError"];
    } catch (error) {
        delete spec["expectedAst"];
        spec["expectedError"] = {
            message: error.message,
            loc: error.loc
        };
    }
}
