import uniqueId from "lodash-es/uniqueId";
import xorBy from "lodash-es/xorBy";
import map from "lodash-es/map";
import replace from "lodash-es/replace";
import EventEmitter from "wolfy87-eventemitter";

const eventEmitter = new EventEmitter();

export function createInterface(option) {
  return Object.assign(
    {},
    {
      _id: uniqueId(),
      name: "未命名请求",
      path: "",
      method: "GET",
      request: {
        path: [],
        query: [],
        headers: [],
        body: {
          type: "none",
          value: []
        }
      },
      response: {
        headers: [],
        body: {
          type: "json",
          value: []
        }
      }
    },
    option
  );
}

// 解析成数组 保存参数顺序
function parseQueryString(queryString) {
  const query = [];
  queryString = queryString[0] === "?" ? queryString.slice(1) : queryString;
  queryString.split("&").forEach(item => {
    const arr = item.split("=");
    if (arr[0]) {
      query.push({
        name: arr[0],
        value: arr[1] || ""
      });
    }
  });
  return query;
}

// 序列化 querstring 数组
function stringifyQuery(query) {
  let queryString = "?";
  queryString += query
    .map(item => {
      return item.name + "=" + item.value;
    })
    .join("&");
  return queryString;
}

export function resolvePathParams(url) {
  if (url.indexOf("?") > -1) {
    url = url.split("?")[0];
  }
  const matches = url.match(/(?<=:)[\w_-]+(?!=[\/?])|(?<=\{)[\w_-]+(?!=})/g);
  if (matches) {
    return matches.map(item => ({
      name: item,
      example: "",
      desc: ""
    }));
  }
  return [];
}

export function resolveQueryParams(url) {
  const res = [];
  if (url.indexOf("?") > -1) {
    const query = parseQueryString(url.split("?")[1]);
    query.forEach(item => {
      res.push({
        name: item.name,
        example: item.value,
        desc: "",
        required: true
      });
    });
  }
  return res;
}

export function syncQuery(url = "", query) {
  const length = query.length;
  const index = url.indexOf("?");
  if (!length) {
    return index > -1 ? url.slice(0, index + 1) : url;
  } else {
    if (index > -1) {
      const urlQuery = parseQueryString(url.split("?")[1]);
      // 同步query变更到url，1. name 的更改 2.example 的更改
      const params = map(xorBy(query, urlQuery, "name"), "name");
      if (!params.length) {
        query.forEach(m => {
          const item = urlQuery.find(i => i.name === m.name);
          item.value = m.example;
        });
      } else if(params.length === 1) {
        if(query.length > urlQuery.length) {
          // query 新增操作
          urlQuery.push({ name: params[0], value: '' });
        } else {
          // query 删除操作
          const index = urlQuery.findIndex(item => item.name === params[0]);
          urlQuery.splice(index, 1);
        }
      } else {
        // query name更改操作
        const index = urlQuery.findIndex(item => item.name === params[1]);
        // query name 为空字符串
        if (params[0]) {
          urlQuery[index].name = params[0];
        } else {
          urlQuery.splice(index, 1);
        }
      }
      return url.split("?")[0] + stringifyQuery(urlQuery) + (url.endsWith('&') ? '&' : '');
    } else {
      return `${url}?${query[0].name}`;
    }
  }
}

export function normalizePath(url) {
  url = replace(url, /\/+/g, "/");
  if (url[0] === "/") url = url.slice(1);
  if (url[url.length - 1] === "/") url = url.slice(0, -1);
  return url;
}

// 转化 api 对象到 options
function resolveOptions(api) {
  return {
    id: api.key,
    method: api.method,
    url: resolveOptionsUrl(api),
    headers: api.request.headers,
    data: api.request.body
  };
}

// 根据 request params 获取请求 url
function resolveOptionsUrl({ path, request: { params } }) {
  return;
}

function getType(value) {
  return Object.prototype.toString.call(value).match(/\s(\w+)]$/)[1];
}

function isValid(payload) {
  return getType(payload) === "Object" && payload.type === "extension2browser";
}

// 浏览器监听插件返回的请求信息
window.addEventListener(
  "message",
  function(event) {
    if (isValid(event.data)) {
      eventEmitter.emitEvent(event.data.payload.request.id, event.data.payload);
    }
  },
  false
);

// 浏览器向插件传递信息
export function sendRequest(api) {
  const options = resolveOptions(api);
  return new Promise(function(resolve) {
    window.postMessage(
      {
        type: "browser2extension",
        payload: options
      },
      location.origin
    );
    function listener(payload) {
      resolve(payload);
      eventEmitter.removeListener(options.id, listener);
    }
    eventEmitter.addListener(options.id, listener);
  });
}
