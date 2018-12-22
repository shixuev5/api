import ip from "ip-regex";
import email from "isemail";
import uri from "is-uri";

function isType(val) {
  return Object.prototype.toString
    .call(val)
    .match(/\s(\w+)]$/)[1]
    .toLowerCase();
}

function isPrimitive(val) {
  return ["number", "boolean", "null", "string"].indexOf(isType(val)) > -1;
}

function isUUID(val) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    val
  );
}

function isIpv4(val) {
  return ip.v4({ exact: true }).test(val);
}

function isIpv6(val) {
  return ip.v6({ exact: true }).test(val);
}

function isEmail(val) {
  return email.validate(val);
}

function isUri(val) {
  return uri(val);
}

function clone(val) {
  return JSON.parse(JSON.stringify(val));
}

class Schema {
  static options = {
    version: "draft-06",
    root: "Root Schema",
    uri: "http://example.com/root.json",
    required: true,
    title: true,
    default: false,
    examples: true,
    description: true,
    enums: false,
    allowNull: false
  };

  constructor(data, options = {}) {
    this._origin = isType(data) === "string" ? JSON.parse(data) : data;
    this._data = clone(this._origin);
    this._options = Object.assign(Schema.options, options);
    this._baseSchema = this._createBaseSchema();
    this._hooks = [];
  }

  getJSON() {
    return this._origin;
  }

  getSchema() {
    if (isPrimitive(this._data)) {
      return this._baseSchema;
    } else if (isType(this._data) === "array") {
      return Object.assign(this._walk("items", this._data), this._baseSchema);
    } else {
      return Object.assign(
        this._walk("properties", this._data),
        this._baseSchema
      );
    }
  }

  setOptions(options) {
    this._options = Object.assign(this._options, options);
  }

  getOptions() {
    return this._options;
  }

  resetOptions() {
    this._options = Object.assign({}, Schema.options);
  }

  registerHook(fn) {
    this._hooks.push(fn);
    return () => {
      this._hooks.splice(this._hooks.indexOf(fn), 1);
    };
  }

  _createBaseSchema() {
    return {
      definitions: {},
      $schema: `http://json-schema.org/${this._options.version}/schema#`,
      $id: this._options.uri,
      type: this._options.allowNull
        ? [isType(this._data), "null"]
        : isType(this._data),
      title: this._options.root
    };
  }

  _handleOptions(schema, key, value) {
    const { required, title, examples, description, enums, allowNull } = this._options;
    description && (schema.description = '');
    title && (schema.title = key);
    if (isType(value) === "object" && required) {
      schema.required = Object.keys(value);
    }
    if (isPrimitive(value) && this._options.default) schema.default = value;
    if (isPrimitive(value) && examples) schema.examples = [value];
    if (isPrimitive(value) && enums) schema.enums = [value];
    if (allowNull) {
      schema.type = [schema.type, "null"];
      schema.enums && schema.enums.push(null);
    }
    return schema;
  }

  _isUniqueItem(array) {
    let cache;
    array.forEach(item => {
      let type = isType(item);
      if (cache !== undefined && type !== cache) {
        return true;
      }
      cache = type;
    });
    return false;
  }

  _handleArray(value, path) {
    const schema = {
      $id: path,
      type: "array"
    };
    if (!value.length) return schema;
    if (this._isUniqueItem(value)) {
      schema.items = {
        anyOf: value.map(item => this._walk("items", item, path))
      };
    } else {
      const subSchema = this._walk("items", value[0], path);
      if (this._options.examples && subSchema.examples) {
        subSchema.examples = value;
      }
      schema.items = subSchema;
    }
    return schema;
  }

  _handleObject(value, path) {
    const properties = {};
    Object.keys(value).forEach(
      objKey => (properties[objKey] = this._walk(objKey, value[objKey], path))
    );
    return {
      $id: path,
      type: "object",
      properties,
      additionalProperties: false
    };
  }

  _handleNumber(value, path) {
    return {
      $id: path,
      type: Number.isInteger(value) ? "integer" : "number"
    };
  }

  _handleString(value, path) {
    const schema = {
      $id: path,
      type: "string",
      pattern: "^(.*)$"
    };
    if (isUUID(value)) schema.format = "uuid";
    if (isIpv4(value)) schema.format = "ipv4";
    if (isIpv6(value)) schema.format = "ipv6";
    if (isEmail(value)) schema.format = "email";
    if (isUri(value)) schema.format = "uri";
    return schema;
  }

  _walk(key, value, path = "#") {
    let schema;
    const type = isType(value);
    path = `${path}/${key}`;

    switch (type) {
      case "array":
        schema = this._handleArray(value, path);
        break;
      case "object":
        schema = this._handleObject(value, path);
        break;
      case "number":
        schema = this._handleNumber(value, path);
        break;
      case "string":
        schema = this._handleString(value, path);
        break;
      default:
        schema = {
          $id: path,
          type
        };
    }

    this._handleOptions(schema, key, value);

    this._hooks.forEach(hook => {
      hook.call(null, schema);
    });

    return schema;
  }
}

export default Schema;
