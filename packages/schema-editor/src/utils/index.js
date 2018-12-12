import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage
} from "quicktype-core";
import ajv from "ajv";
import refParser from 'json-schema-ref-parser';

export async function json2schema(content, name = "root") {
  content = jsonStringify(content);
  const inputData = new InputData();
  await inputData.addSource("json", { name, samples: [content] }, () =>
    jsonInputForTargetLanguage("json-schema")
  );
  const result = await quicktype({
    lang: "json-schema",
    inputData
  });
  return resolveSchemaRef(jsonParse(result.lines.join("\n").trim()));
}

export function isValidSchema(schema) {
  if (typeof schema === 'string') {
    schema = jsonParse(schema);
  }
  const instant = new ajv();
  instant.validateSchema(schema);
  if(instant.errors) {
    throw instant.errors;
  }
  return true;
}

export function jsonStringify(json) {
  try {
    return JSON.stringify(json);
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

export async function resolveSchemaRef(schema) {
  try {
    return await refParser.dereference(schema);
  } catch (error) {
    throw error;
  }
}
