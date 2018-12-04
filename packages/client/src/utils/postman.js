import nanoid from 'nanoid';

export function createInterface(option) {
  return Object.assign({}, {
    key: nanoid(),
    name: '未命名请求',
    path: '',
    method: 'GET',
    request: {
      header: [],
      params: [],
      body: {},
    },
    response: {
      header: [],
      body: {},
    }
  }, option);
}

export function createRequestParams(params) {
  return params.map(param => {

  })
}

export function resolveRequestParams(url) {
  const reg = /(?<=:)[\w_-]+|(?<=\{)[\w_-]+/g;
  return url.match(reg);
}