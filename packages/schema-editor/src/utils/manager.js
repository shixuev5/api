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
