import nanoid from "nanoid";
// import array2tree from "performant-array-to-tree";

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function array2tree(items, config) {
  config = Object.assign({ id: "id", parentId: "parentId", root: 0 }, config);
  const rootItems = [];
  const lookup = {};
  for (let _i = 0, items_1 = items; _i < items_1.length; _i++) {
    const item = items_1[_i];
    const itemId = item[config.id];
    const parentId = item[config.parentId];

    if (!Object.prototype.hasOwnProperty.call(lookup, itemId)) {
      lookup[itemId] = { data: null, children: [] };
    }
    lookup[itemId].data = item;
    var TreeItem = lookup[itemId];
    if (parentId === root) {
      rootItems.push(TreeItem);
    } else {
      if (!Object.prototype.hasOwnProperty.call(lookup, parentId)) {
        lookup[parentId] = { data: null, children: [] };
      }
      lookup[parentId].children.push(TreeItem);
    }
  }
  return rootItems;
}

class Manager {
  constructor(schema) {
    this._schema = clone(schema);
    this._root = this.getRootNode();
    this._treeNodes = {};
    this.walk(this._root);
    this._treeData = array2tree(Object.values(this._treeNodes));
  }
  getRootNode() {
    return this.resolveRef(this._schema.$ref);
  }
  walk(node, parentId = 0) {
    node.id = nanoid();
    node.parentId = parentId;
    if (node.$ref) {
      Object.assign(node, this.resolveRef(node.$ref));
    }
    this._treeNodes[node.id] = node;
    if (node.properties) {
      for (const key in node.properties) {
        this.walk(node.properties[key], node.id);
      }
    }
    if (node.items) {
      if (node.items.$ref) {
        this.walk(this.resolveRef(node.items.$ref), node.id);
      } else if (Array.isArray(node.items)) {
        node.items.forEach(item => this.walk(item, node.id));
      } else {
        this.walk(node.items, node.id);
      }
    }
  }
  createTreeNode(value) {
    return {};
  }
  resolveRef(ref) {
    return this._schema.definitions[ref.match(/#\/definitions\/(.+)/)[1]];
  }
}

export default Manager;
