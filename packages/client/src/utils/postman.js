import nanoid from "nanoid";
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
        headers: [],
        params: [],
        body: {}
      },
      response: {
        headers: [],
        body: {}
      }
    },
    option
  );
}

export function createRequestParams(params) {
  return params.map(param => {
    return {
      name: param,
      value: "",
      desc: "",
    }
  });
}

export function resolveRequestParams(url) {
  const reg = /(?<=:)[\w_-]+(?=[\/?])|(?<=\{)[\w_-]+(?=})/g;
  return url.match(reg);
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
