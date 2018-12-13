import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
  JSONSchemaInput
} from "quicktype-core";
import ajv from "ajv";
import refParser from "json-schema-ref-parser";

export async function resolveSchema(content, name = "root") {
  const inputData = new InputData();
  if (isJsonSchema(content)) {
    isValidSchema(content);
    await inputData.addSource(
      "schema",
      { name, schema: content },
      () => new JSONSchemaInput(undefined)
    );
  } else {
    await inputData.addSource("json", { name, samples: [content] }, () =>
      jsonInputForTargetLanguage("json-schema")
    );
  }
  const result = await quicktype({
    lang: "json-schema",
    inputData
  });
  const res = jsonParse(result.lines.join("\n").trim());
  console.log(res);
  return res;
}

function isValidSchema(schema) {
  try {
    const instant = new ajv({ schemaId: "auto" });
    instant.addMetaSchema(require("ajv/lib/refs/json-schema-draft-04.json"));
    instant.addMetaSchema(require("ajv/lib/refs/json-schema-draft-06.json"));
    instant.validateSchema(schema);
    return instant.errors ? false : true;
  } catch (error) {
    return false;
  }
}

function isJsonSchema(content) {
  return !!jsonParse(content).$schema;
}

export function jsonStringify(json) {
  try {
    if (typeof json !== "string") {
      return JSON.stringify(json);
    }
    return json;
  } catch (error) {
    throw error;
  }
}

export function jsonParse(content) {
  try {
    if (typeof content == "object") {
      content = JSON.stringify(content);
    }
    return JSON.parse(content);
  } catch (error) {
    throw error;
  }
}

async function resolveSchemaRef(schema) {
  try {
    return await refParser.dereference(schema);
  } catch (error) {
    throw error;
  }
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}
