chrome 插件实现自定义请求头以及跨域请求

浏览器向插件传递信息

```js
function sendRequest(options) {
  window.postMessage({
    type: "browser2extension",
    payload: options
  }, location.origin);
}
```

浏览器监听插件返回的请求信息

```js
function getType(value) {
  return Object.prototype.toString.call(value).match(/\s(\w+)]$/)[1];
}

function isValid(payload) {
  return getType(payload) === "Object" && payload.type === "extension2browser";
}

window.addEventListener('message', function(event) {
  if(isValid(event.data)) {
    // 处理返回的数据 event.data.payload;
  }
}, false);
```

请求传递的 options 对象格式
```js
{
  id: "xxx"  // 请求的唯一标识（必须）
  method: "GET"  // 请求方式（必须）
  url: "http://www.xxx.com/xxx/xx?q=xxx#hash" // 请求的完整 url（必须）
  withCredentials: true, // 跨域请求携带认证信息
  headers: [
    {
      name: "Content-Type",
      value: "application/x-www-form-urlencoded"
    }
  ],
  data: Document || Blob || BufferSource || FormData || URLSearchParams || ReadableStream || USVString
}
```

请求返回的 event.data.payload 对象格式
```js
{
  request: options,
  response: {
    headers: responseHeaders,
    body: xhr.response,
  },
  status: xhr.status,
  statusText: xhr.statusText,
}
```