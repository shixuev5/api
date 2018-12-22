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

// async function resolveSchemaRef(schema) {
//   try {
//     return await refParser.dereference(schema);
//   } catch (error) {
//     throw error;
//   }
// }

import uniqueId from 'lodash-es/uniqueId';

export function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
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

export function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function walkSchema(schema, callback) {
  if(schema.type === 'object') {
    for (const key in schema.properties) {
      walkSchema(schema.properties[key], callback);
    }
  } else if(schema.type === 'array') {
    walkSchema(schema.items, callback);
  }
  callback(schema);
}

export function schema2array(schema, parentId = 0) {
  let arr = [schema];
  schema.parentId = parentId;
  schema.id = uniqueId();
  if(schema.type === 'object') {
    for (const key in schema.properties) {
      arr = arr.concat(schema2array(schema.properties[key], schema.id));
    }
  } else if(schema.type === 'array') {
    arr = arr.concat(schema2array(schema.items, schema.id))
  }
  return arr;
}

export function array2tree(items, config) {
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
      return "no.";
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
