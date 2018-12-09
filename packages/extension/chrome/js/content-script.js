var port = chrome.runtime.connect({ name: 'api-extension' });

function getType(value) {
  return Object.prototype.toString.call(value).match(/\s(\w+)]$/)[1];
}

function isValid(payload) {
  return getType(payload) === "Object" && payload.type === "browser2extension";
}

/* 监听 background 的消息响应，传回到页面 */
port.onMessage.addListener(function(response) {
  window.postMessage({
    type: "extension2browser",
    payload: response
  }, location.origin);
});

/* 接受页面 postMassage 传递的数据，传递到 background */
window.addEventListener('message', function(event) {
  if(isValid(event.data)) {
    port.postMessage(event.data.payload);
  }
}, false);
