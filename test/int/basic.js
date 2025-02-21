/* eslint-disable no-template-curly-in-string */

import test from 'ava'
import convertFile from 'convert/file'

test('minimal', async t => {
  const [ main ] = await convertFile('test/material/2/minimal.json')
  t.is(main, `// No HTTP/HTTPS transactions have been recorded`)
})

test('request', async t => {
  const [ main ] = await convertFile('test/material/2/request.json')
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com"
  });
}
`)
})

test('raw body', async t => {
  const [ main ] = await convertFile('test/material/2/body-raw.json')
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "POST",
    address: "http://example.com",
    data: "line1\\nline2\\nline3\\n"
  });
}
`)
})

test('form body', async t => {
  const [ main ] = await convertFile('test/material/2/body-form.json')
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "POST",
    address: "http://example.com",
    data: { first: "one", second: "two", third: "three" }
  });
}
`)
})

test('url body', async t => {
  const [ main ] = await convertFile('test/material/2/body-url.json')
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "POST",
    address: "http://example.com",
    data: { first: "one", second: "two", third: "three" },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}
`)
})

test('no body alternate', async t => {
  const [ main ] = await convertFile('test/material/2.1/no-body-alternate.json')
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com"
  });
}
`)
})

test('iterations', async t => {
  const [ main ] = await convertFile('test/material/2/request.json', {
    iterations: 25
  })
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";

export let options = { maxRedirects: 4, iterations: 25 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com"
  });
}
`)
})
