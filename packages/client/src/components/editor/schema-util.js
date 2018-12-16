// import ajv from "ajv";
// import refParser from "json-schema-ref-parser";

// function isValidSchema(schema) {
//   try {
//     const instant = new ajv({ schemaId: "auto" });
//     instant.addMetaSchema(require("ajv/lib/refs/json-schema-draft-04.json"));
//     instant.addMetaSchema(require("ajv/lib/refs/json-schema-draft-06.json"));
//     instant.validateSchema(schema);
//     return instant.errors ? false : true;
//   } catch (error) {
//     return false;
//   }
// }

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

// async function resolveSchemaRef(schema) {
//   try {
//     return await refParser.dereference(schema);
//   } catch (error) {
//     throw error;
//   }
// }

export function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function array2tree(items, config) {
  config = Object.assign({ id: "id", parentId: "parentId", root: 0 }, config);
  const rootItems = [];
  const lookup = {};
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemId = item[config.id];
    const parentId = item[config.parentId];

    if (!lookup[itemId]) {
      lookup[itemId] = item;
      item.children = [];
    }
    const TreeItem = lookup[itemId];
    if (parentId === config.root) {
      rootItems.push(TreeItem);
    } else {
      if (!lookup[parentId]) {
        lookup[parentId] = { children: [] };
      }
      lookup[parentId].children.push(TreeItem);
    }
  }
  return rootItems;
}

export function formatType(type) {
  switch (type) {
    case "array":
      return "[ ]";
    case "object":
      return "{ }";
    case "string":
      return "str";
    case "number":
      return "num";
    case "integer":
      return "int";
    case "boolean":
      return "bol";
    case "null":
      return "nul";
    default:
      return "*";
  }
}