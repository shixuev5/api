import nanoid from "nanoid";
import { parseUrl } from "query-string";
import EventEmitter from "wolfy87-eventemitter";

const eventEmitter = new EventEmitter();

export function createInterface(option) {
  return Object.assign(
    {},
    {
      _id: nanoid(),
      name: "未命名请求",
      path: "",
      method: "GET",
      request: {
        path: [],
        query: [],
        headers: [],
        body: {
          type: "none"
        }
      },
      response: {
        headers: [],
        body: {
          type: "json"
        }
      }
    },
    option
  );
}

export function resolvePathParams(url) {
  const path = url.match(/:\/\/(.+)\??/)[1];
  const matches = path.match(/(?<=:)[\w_-]+(?=[\/?])|(?<=\{)[\w_-]+(?=})/g);
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
  const { query } = parseUrl(url);
  for (const key of Object.keys(query)) {
    res.push({
      name: key,
      example: query[key],
      desc: "",
      required: true
    });
  }
  return res;
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
