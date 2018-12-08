


// 监听来自 content-script 的消息
chrome.runtime.onConnect.addListener(function(port) {
  if(port.name === 'request') {
    console.log(port.data);
    port.postMessage("请求响应");
  }
});

chrome.webRequest.onBeforeSendHeaders.addListener();
chrome.webRequest.onHeadersReceived.addListener();