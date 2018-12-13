import nanoid from "nanoid";
import { clone, capitalize } from "./index";

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

class Manager {
  constructor(schema) {
    this._init(schema);
  }
  _init(schema) {
    // TODO: schema validate
    if (!schema.$ref) return;
    this._schema = clone(schema);
    this._root = this.getRootNode();
    this._rootKey = this._resolveRefName(this._schema.$ref);
    this._treeNodes = {};
    this._walk(this._rootKey, this._root);
    this._treeData = array2tree(Object.values(this._treeNodes));
  }
  get treeData() {
    return this._treeData;
  }
  setSchema(schema) {
    this._init(schema);
  }
  getRootNode() {
    return this._resolveRef(this._schema.$ref);
  }
  _walk(key, node, parentId = 0) {
    node.id = nanoid();
    node.parentId = parentId;
    node.title = key;
    node.scopedSlots = { title: 'title' };
    if (node.$ref) {
      Object.assign(node, this._resolveRef(node.$ref));
    }
    this._createTreeNode(node);
    this._treeNodes[node.id] = node;
    if (node.properties) {
      for (const key in node.properties) {
        this._walk(key, node.properties[key], node.id);
      }
    }
    if (node.items) {
      if (node.items.$ref) {
        this._walk(`[0]`, this._resolveRef(node.items.$ref), node.id);
      } else if (Array.isArray(node.items)) {
        node.items.forEach((item, index) =>
          this._walk(`[${index}]`, item, node.id)
        );
      } else {
        this._walk(`[0]`, node.items, node.id);
      }
    }
  }
  _createTreeNode(node) {
    if (!node.type) node.type = "any";
    this[`_create${capitalize(node.type)}TreeNode`](node);
  }
  _createObjectTreeNode(node) {
    Object.assign(node, {
      icon: "{}",
    });
  }
  _createArrayTreeNode(node) {
    Object.assign(node, {
      icon: "[]",
      // maxItems: 0,
      // minItems: 0,
      // uniqueItems: true,
      // items: []
    });
  }
  _createStringTreeNode(node) {
    Object.assign(node, {
      icon: `""`,
      // maxLength: 0,
      // minLength: 0,
      // pattern: '',
      // format: ''
    });
  }
  _createNumberTreeNode(node) {
    Object.assign(node, {
      icon: "num",
      // exclusiveMinimum: 0,
      // exclusiveMinimum: 0,
      // multipleOf: 0,
    });
  }
  _createIntegerTreeNode(node) {
    Object.assign(node, {
      icon: "int"
    });
  }
  _createBooleanTreeNode(node) {
    Object.assign(node, {
      icon: "bol"
    });
  }
  _createNullTreeNode(node) {
    Object.assign(node, {
      icon: "nul"
    });
  }
  _createAnyTreeNode(node) {
    Object.assign(node, {
      icon: "*"
    });
  }
  _resolveRef(ref) {
    return this._schema.definitions[this._resolveRefName(ref)];
  }
  _resolveRefName(ref) {
    return ref.match(/#\/definitions\/(.+)/)[1];
  }
}

export default Manager;
