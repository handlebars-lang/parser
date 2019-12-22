import { safeDump } from "js-yaml";

export function asYaml(actualAst: object): string {
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
    const specialPropertyOrder = [
        "description",
        "template",
        "expectedAst",
        "expectedError",
        "type",
        "loc",
        "start",
        "end",
        "line",
        "column"
    ].indexOf(propertyName);
    if (specialPropertyOrder >= 0) {
        return String(specialPropertyOrder);
    }
    return propertyName;
}
