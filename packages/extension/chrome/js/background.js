function handleHeaders(headers) {
  var arr = headers.trim().split(/[\r\n]+/);
  var headerMap = {};
  arr.forEach(function(line) {
    var parts = line.split(": ");
    var header = parts.shift();
    var value = parts.join(": ");
    headerMap[header] = value;
  });
  return headerMap;
}

// source - target
function difference(source, target) {
  return source.filter(function(i) {
    return target.some(function(m) {
      return m.name === i.name;
    });
  });
}

// target + source && update source
function union(source, target) {
  target.forEach(function(m) {
    var result = source.filter(function(i) {
      return i.name === m.name;
    })
    if(result.length) {
      result[0].value = m.value;
    } else {
      source.push(m);
    }
  })
  return source;
}

function objectValues(object) {
  var values = [];
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      values.push(object[key]);
    }
  }
  return values;
}

function isExsit(array, value) {
  for (var index = 0; index < array.length; index++) {
    if(new RegExp(array[index], 'i').test(value)) {
      return true;
    }
  }
  return false;
}

function handleForbiddenRequestHeaders(headers) {
  return headers.filter(function(header) {
    return isExsit(ForbiddenRequestHeaders, header.name);
  });
}

var transfer = {};

// refs: https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name
var ForbiddenRequestHeaders = [
  "Accept-Charset",
  "Accept-Encoding",
  "Access-Control-Request-Headers",
  "Access-Control-Request-Method",
  "Connection",
  "Content-Length",
  "Cookie",
  "Cookie2",
  "Date",
  "DNT",
  "Expect",
  "Host",
  "Keep-Alive",
  "Origin",
  "Proxy-",
  "Sec-",
  "Referer",
  "TE",
  "Trailer",
  "Transfer-Encoding",
  "Upgrade",
  "Vi"
];

// refs: https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_response_header_name
var ForbiddenResponseHeaders = ["Set-Cookie", "Set-Cookie2"];

function sendRequest(options) {
  return function(resolve) {
    const xhr = new XMLHttpRequest();

    xhr.open(options.method, options.url, true);

    xhr.onload = function() {
      var headers = handleHeaders(xhr.getAllResponseHeaders());
      transfer[options.id].cookies.forEach(function(item) {
        if(!headers[item.name]) {
          headers[item.name] = [];
        }
        headers[item.name].push(item.value);
      });
      resolve({
        request: options,
        response: {
          headers: headers,
          body: xhr.response,
        },
        status: xhr.status,
        statusText: xhr.statusText,
      })
    };

    xhr.onerror = function() {
      resolve({
        request: options,
        response: null,
        status: xhr.status,
        statusText: xhr.statusText,
      })
    };

    xhr.onprogress = function(event) {
      if (event.lengthComputable) {
        var percentComplete = event.loaded / event.total * 100;
        resolve({
          request: options,
          response: {
            body: percentComplete,
          },
          status: xhr.status,
          statusText: xhr.statusText,
        })
      }
    }

    xhr.onabort = function() {
      resolve({
        request: options,
        response: null,
        status: xhr.status,
        statusText: xhr.statusText,
      })
    }

    xhr.withCredentials = options.withCredentials ? options.withCredentials : false;
    // 带上请求 id 标识
    xhr.setRequestHeader("sign", options.id);
    // 添加请求头
    if (options.headers) {
      // 处理禁止的请求头，缓存到 transfer 对象
      var forbiddenRequestHeaders = handleForbiddenRequestHeaders(
        options.headers
      );
      transfer[options.id].headers = forbiddenRequestHeaders;
      // 求差集，得到允许的请求头
      var allowRequestHeaders = difference(
        options.headers,
        forbiddenRequestHeaders
      );
      allowRequestHeaders.forEach(function(item) {
        xhr.setRequestHeader(item.name, item.value);
      });
    }
    xhr.send(options.data || null);
  };
}

// 监听来自 content-script 的消息
chrome.runtime.onConnect.addListener(function(port) {
  if (port.name === "api-extension") {
    port.onMessage.addListener(function(msg) {
      transfer[msg.id] = {
        requestId: "",
        headers: [],
        cookies: []
      };
      sendRequest(msg)(function (response) {
        if(transfer[msg.id]) {
          delete transfer[msg.id];
        }
        port.postMessage(response);
      });
    });
  }
});

function beforeSendHeaders(details) {
  var result = details.requestHeaders.filter(function(header) {
    return header.name === "sign";
  });
  if (result.length) {
    var sign = result[0];
    transfer[sign.value].requestId = details.requestId;
    union(details.requestHeaders, transfer[sign.value].headers);
  }
  return { requestHeaders: details.requestHeaders };
}

function headersReceived(details) {
  details.responseHeaders.forEach(function(header) {
    if (isExsit(ForbiddenResponseHeaders, header.name)) {
      var result = objectValues(transfer).filter(function(item) {
        return item.requestId === details.requestId;
      });
      if (result.length) {
        result[0].cookies.push(header);
      }
    }
  });
  return { responseHeaders: details.responseHeaders };
}

chrome.webRequest.onBeforeSendHeaders.addListener(
  beforeSendHeaders,
  { urls: ["<all_urls>"] },
  ["blocking", "requestHeaders"]
);
chrome.webRequest.onHeadersReceived.addListener(
  headersReceived,
  { urls: ["<all_urls>"] },
  ["blocking", "responseHeaders"]
);
