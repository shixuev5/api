
var port = chrome.runtime.connect({ name: 'request' });

/* 监听 background 的消息响应，传回到页面 */
port.onMessage.addListener(function(response) {
  console.log(response);
  window.postMessage(response);
});

/* 接受页面 postMassage 传递的数据，传递到 background */
window.addEventListener('message', function(e) {
  console.log(e.data);
  port.postMessage(e.data);
}, false);