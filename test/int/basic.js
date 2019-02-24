/* eslint-disable no-template-curly-in-string */

import test from 'ava'
import convertFile from 'convert/file'

test('minimal', t => {
  const result = convertFile('test/material/2/minimal.json')
  t.is(result, `// No HTTP/HTTPS transactions have been recorded`)
})

test('request', t => {
  const result = convertFile('test/material/2/request.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import http from "k6/http";

export let options = { maxRedirects: 4 };

export default function() {
  let res;

  res = http.get("http://example.com");
}
`)
})

test('variable', t => {
  const result = convertFile('test/material/2/variable.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import http from "k6/http";

export let options = { maxRedirects: 4 };

export default function() {
  const vars = {
    domain: "example.com",
    machine: 573
  };

  let res;

  res = http.get(${'`http://${vars["machine"]}.${vars["domain"]}`'});
}
`)
})
